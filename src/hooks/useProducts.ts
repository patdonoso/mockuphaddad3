import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type ProductRow = Database['public']['Tables']['products']['Row'];
type CategoryRow = Database['public']['Tables']['categories']['Row'];

export interface Product {
  id: string;
  name: string;
  code: string | null;
  category: string;
  category_id: string | null;
  price: number;
  original_price: number | null;
  description: string | null;
  capacity: string | null;
  image_url: string | null;
  is_on_offer: boolean;
  discount_percentage: number;
}

export interface Category {
  id: string;
  name: string;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }

    return data.map((cat: CategoryRow) => ({
      id: cat.id,
      name: cat.name,
    }));
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [productsResult, categoriesResult] = await Promise.all([
        supabase
          .from('products')
          .select(`
            *,
            categories (
              id,
              name
            )
          `)
          .order('name'),
        fetchCategories(),
      ]);

      if (productsResult.error) {
        throw productsResult.error;
      }

      const formattedProducts: Product[] = productsResult.data.map((p: any) => ({
        id: p.id,
        name: p.name,
        code: p.code,
        category: p.categories?.name || 'Sin categoría',
        category_id: p.category_id,
        price: Number(p.price),
        original_price: p.original_price ? Number(p.original_price) : null,
        description: p.description,
        capacity: p.capacity,
        image_url: p.image_url,
        is_on_offer: p.is_on_offer || false,
        discount_percentage: p.discount_percentage || 0,
      }));

      setProducts(formattedProducts);
      setCategories(categoriesResult);
    } catch (err: any) {
      console.error('Error fetching products:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    categories,
    isLoading,
    error,
    refetch: fetchProducts,
  };
};

export const useAdminProducts = () => {
  const { products, categories, isLoading, error, refetch } = useProducts();

  const createCategory = async (name: string): Promise<{ success: boolean; id?: string; error?: string }> => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert({ name })
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      await refetch();
      return { success: true, id: data.id };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const createProduct = async (product: {
    name: string;
    code?: string;
    category_id?: string;
    price: number;
    description?: string;
    capacity?: string;
    image_url?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await supabase.from('products').insert({
        name: product.name,
        code: product.code || null,
        category_id: product.category_id || null,
        price: product.price,
        description: product.description || null,
        capacity: product.capacity || null,
        image_url: product.image_url || null,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      await refetch();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const updateProduct = async (
    id: string,
    updates: Partial<{
      name: string;
      code: string;
      category_id: string;
      price: number;
      description: string;
      capacity: string;
      image_url: string;
      is_on_offer: boolean;
      discount_percentage: number;
      original_price: number;
    }>
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id);

      if (error) {
        return { success: false, error: error.message };
      }

      await refetch();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const deleteProduct = async (id: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);

      if (error) {
        return { success: false, error: error.message };
      }

      await refetch();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const applyOffer = async (
    productIds: string[],
    discountPercentage: number
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // Get current products to calculate new prices
      const { data: currentProducts, error: fetchError } = await supabase
        .from('products')
        .select('id, price, original_price')
        .in('id', productIds);

      if (fetchError) {
        return { success: false, error: fetchError.message };
      }

      // Update each product with the offer
      for (const product of currentProducts || []) {
        const originalPrice = product.original_price || product.price;
        const discountedPrice = Math.round(Number(originalPrice) * (1 - discountPercentage / 100));

        const { error: updateError } = await supabase
          .from('products')
          .update({
            original_price: originalPrice,
            price: discountedPrice,
            is_on_offer: true,
            discount_percentage: discountPercentage,
          })
          .eq('id', product.id);

        if (updateError) {
          console.error('Error updating product:', updateError);
        }
      }

      await refetch();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const removeOffer = async (productIds: string[]): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data: currentProducts, error: fetchError } = await supabase
        .from('products')
        .select('id, original_price')
        .in('id', productIds);

      if (fetchError) {
        return { success: false, error: fetchError.message };
      }

      for (const product of currentProducts || []) {
        const { error: updateError } = await supabase
          .from('products')
          .update({
            price: product.original_price || 0,
            original_price: null,
            is_on_offer: false,
            discount_percentage: 0,
          })
          .eq('id', product.id);

        if (updateError) {
          console.error('Error removing offer from product:', updateError);
        }
      }

      await refetch();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const uploadProductImage = async (file: File): Promise<{ success: boolean; url?: string; error?: string }> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file);

      if (uploadError) {
        return { success: false, error: uploadError.message };
      }

      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      return { success: true, url: publicUrl };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  return {
    products,
    categories,
    isLoading,
    error,
    refetch,
    createCategory,
    createProduct,
    updateProduct,
    deleteProduct,
    applyOffer,
    removeOffer,
    uploadProductImage,
  };
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  }).format(price);
};
