import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Tag, 
  ArrowLeft, 
  Upload,
  X,
  Percent,
  Check,
  Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useAdminProducts, formatPrice, Product } from '@/hooks/useProducts';
import logoHaddad from '@/assets/logo-haddad.png';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, isAdmin, isLoading: authLoading } = useAuth();
  const {
    products,
    categories,
    isLoading,
    createCategory,
    createProduct,
    updateProduct,
    deleteProduct,
    applyOffer,
    removeOffer,
    uploadProductImage,
    refetch,
  } = useAdminProducts();

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterCode, setFilterCode] = useState('');

  // Product form state
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    code: '',
    category_id: '',
    price: '',
    description: '',
    capacity: '',
    image_url: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  // New category state
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  // Offer state
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [offerDiscount, setOfferDiscount] = useState('');
  const [isApplyingOffer, setIsApplyingOffer] = useState(false);

  // Access control
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !isAdmin)) {
      navigate('/');
      toast({
        title: 'Acceso denegado',
        description: 'No tienes permisos para acceder a esta página.',
        variant: 'destructive',
      });
    }
  }, [isAuthenticated, isAdmin, authLoading, navigate, toast]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      
      const matchesCategory = filterCategory === 'all' || product.category_id === filterCategory;
      
      const matchesCode = !filterCode || 
        (product.code?.toLowerCase().includes(filterCode.toLowerCase()) ?? false);

      return matchesSearch && matchesCategory && matchesCode;
    });
  }, [products, searchQuery, filterCategory, filterCode]);

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Open product dialog for create/edit
  const openProductDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setProductForm({
        name: product.name,
        code: product.code || '',
        category_id: product.category_id || '',
        price: product.price.toString(),
        description: product.description || '',
        capacity: product.capacity || '',
        image_url: product.image_url || '',
      });
      setImagePreview(product.image_url || '');
    } else {
      setEditingProduct(null);
      setProductForm({
        name: '',
        code: '',
        category_id: '',
        price: '',
        description: '',
        capacity: '',
        image_url: '',
      });
      setImagePreview('');
    }
    setImageFile(null);
    setIsProductDialogOpen(true);
  };

  // Save product
  const handleSaveProduct = async () => {
    if (!productForm.name || !productForm.price) {
      toast({
        title: 'Error',
        description: 'Nombre y precio son requeridos.',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);

    try {
      let imageUrl = productForm.image_url;

      // Upload image if selected
      if (imageFile) {
        const uploadResult = await uploadProductImage(imageFile);
        if (uploadResult.success && uploadResult.url) {
          imageUrl = uploadResult.url;
        } else {
          toast({
            title: 'Error al subir imagen',
            description: uploadResult.error || 'No se pudo subir la imagen.',
            variant: 'destructive',
          });
        }
      }

      const productData = {
        name: productForm.name,
        code: productForm.code || undefined,
        category_id: productForm.category_id || undefined,
        price: parseFloat(productForm.price),
        description: productForm.description || undefined,
        capacity: productForm.capacity || undefined,
        image_url: imageUrl || undefined,
      };

      let result;
      if (editingProduct) {
        result = await updateProduct(editingProduct.id, productData);
      } else {
        result = await createProduct(productData);
      }

      if (result.success) {
        toast({
          title: editingProduct ? 'Producto actualizado' : 'Producto creado',
          description: `El producto "${productForm.name}" se ha ${editingProduct ? 'actualizado' : 'creado'} correctamente.`,
        });
        setIsProductDialogOpen(false);
      } else {
        toast({
          title: 'Error',
          description: result.error || 'No se pudo guardar el producto.',
          variant: 'destructive',
        });
      }
    } finally {
      setIsSaving(false);
    }
  };

  // Delete product
  const handleDeleteProduct = async (product: Product) => {
    if (!confirm(`¿Estás seguro de eliminar "${product.name}"?`)) return;

    const result = await deleteProduct(product.id);
    if (result.success) {
      toast({
        title: 'Producto eliminado',
        description: `El producto "${product.name}" se ha eliminado.`,
      });
    } else {
      toast({
        title: 'Error',
        description: result.error || 'No se pudo eliminar el producto.',
        variant: 'destructive',
      });
    }
  };

  // Add category
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;

    setIsAddingCategory(true);
    const result = await createCategory(newCategoryName.trim());
    setIsAddingCategory(false);

    if (result.success) {
      toast({
        title: 'Categoría creada',
        description: `La categoría "${newCategoryName}" se ha creado.`,
      });
      setNewCategoryName('');
    } else {
      toast({
        title: 'Error',
        description: result.error || 'No se pudo crear la categoría.',
        variant: 'destructive',
      });
    }
  };

  // Toggle product selection for offers
  const toggleProductSelection = (productId: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Apply offer to selected products
  const handleApplyOffer = async () => {
    if (selectedProductIds.length === 0) {
      toast({
        title: 'Error',
        description: 'Selecciona al menos un producto.',
        variant: 'destructive',
      });
      return;
    }

    const discount = parseInt(offerDiscount);
    if (isNaN(discount) || discount <= 0 || discount > 100) {
      toast({
        title: 'Error',
        description: 'Ingresa un descuento válido entre 1 y 100.',
        variant: 'destructive',
      });
      return;
    }

    setIsApplyingOffer(true);
    const result = await applyOffer(selectedProductIds, discount);
    setIsApplyingOffer(false);

    if (result.success) {
      toast({
        title: 'Oferta aplicada',
        description: `Se aplicó ${discount}% de descuento a ${selectedProductIds.length} productos.`,
      });
      setSelectedProductIds([]);
      setOfferDiscount('');
    } else {
      toast({
        title: 'Error',
        description: result.error || 'No se pudo aplicar la oferta.',
        variant: 'destructive',
      });
    }
  };

  // Remove offer from selected products
  const handleRemoveOffer = async () => {
    if (selectedProductIds.length === 0) {
      toast({
        title: 'Error',
        description: 'Selecciona al menos un producto.',
        variant: 'destructive',
      });
      return;
    }

    const result = await removeOffer(selectedProductIds);
    if (result.success) {
      toast({
        title: 'Ofertas removidas',
        description: `Se removieron las ofertas de ${selectedProductIds.length} productos.`,
      });
      setSelectedProductIds([]);
    } else {
      toast({
        title: 'Error',
        description: result.error || 'No se pudieron remover las ofertas.',
        variant: 'destructive',
      });
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-card/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>
            <div className="flex items-center gap-2">
              <img src={logoHaddad} alt="Haddad" className="h-8 w-auto" />
              <span className="font-display text-lg font-semibold text-primary">Admin</span>
            </div>
          </div>
          <Button onClick={() => openProductDialog()} className="gap-2 gradient-haddad text-primary-foreground">
            <Plus className="h-4 w-4" />
            Nuevo Producto
          </Button>
        </div>
      </header>

      <main className="container px-4 py-8">
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="products" className="gap-2">
              <Package className="h-4 w-4" />
              Productos
            </TabsTrigger>
            <TabsTrigger value="offers" className="gap-2">
              <Tag className="h-4 w-4" />
              Ofertas
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Buscar Productos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Nombre o descripción</Label>
                    <Input
                      placeholder="Buscar..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Categoría</Label>
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Código</Label>
                    <Input
                      placeholder="Filtrar por código..."
                      value={filterCode}
                      onChange={(e) => setFilterCode(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add Category */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Nueva Categoría</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Input
                    placeholder="Nombre de la categoría..."
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="max-w-xs"
                  />
                  <Button
                    onClick={handleAddCategory}
                    disabled={isAddingCategory || !newCategoryName.trim()}
                  >
                    {isAddingCategory ? 'Creando...' : 'Agregar'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Products Table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Productos ({filteredProducts.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Imagen</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Código</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Capacidad</TableHead>
                        <TableHead className="text-right">Precio</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <AnimatePresence>
                        {filteredProducts.map((product) => (
                          <motion.tr
                            key={product.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="border-b transition-colors hover:bg-muted/50"
                          >
                            <TableCell>
                              <div className="h-12 w-12 rounded-md bg-muted overflow-hidden">
                                {product.image_url ? (
                                  <img
                                    src={product.image_url}
                                    alt={product.name}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                    <Package className="h-6 w-6" />
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.code || '-'}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.capacity || '-'}</TableCell>
                            <TableCell className="text-right">
                              {product.is_on_offer && product.original_price ? (
                                <div>
                                  <span className="line-through text-muted-foreground text-sm">
                                    {formatPrice(product.original_price)}
                                  </span>
                                  <br />
                                  <span className="font-semibold text-green-600">
                                    {formatPrice(product.price)}
                                  </span>
                                </div>
                              ) : (
                                formatPrice(product.price)
                              )}
                            </TableCell>
                            <TableCell>
                              {product.is_on_offer ? (
                                <Badge variant="default" className="bg-green-600">
                                  -{product.discount_percentage}%
                                </Badge>
                              ) : (
                                <Badge variant="secondary">Normal</Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => openProductDialog(product)}
                                >
                                  <Edit2 className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteProduct(product)}
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </TableBody>
                  </Table>
                </div>

                {filteredProducts.length === 0 && (
                  <div className="py-12 text-center text-muted-foreground">
                    No se encontraron productos.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Offers Tab */}
          <TabsContent value="offers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Percent className="h-5 w-5" />
                  Crear Oferta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-4 items-end">
                  <div className="space-y-2">
                    <Label>Descuento (%)</Label>
                    <Input
                      type="number"
                      min="1"
                      max="100"
                      placeholder="Ej: 20"
                      value={offerDiscount}
                      onChange={(e) => setOfferDiscount(e.target.value)}
                      className="w-32"
                    />
                  </div>
                  <Button
                    onClick={handleApplyOffer}
                    disabled={isApplyingOffer || selectedProductIds.length === 0}
                    className="gap-2 gradient-haddad text-primary-foreground"
                  >
                    {isApplyingOffer ? 'Aplicando...' : 'Aplicar Oferta'}
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleRemoveOffer}
                    disabled={selectedProductIds.length === 0}
                    className="gap-2"
                  >
                    Quitar Oferta
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground">
                  {selectedProductIds.length > 0 ? (
                    <span className="font-medium text-primary">
                      {selectedProductIds.length} productos seleccionados
                    </span>
                  ) : (
                    'Selecciona productos de la lista para aplicar una oferta'
                  )}
                </div>

                {/* Products selection grid */}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {products.map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ scale: 1.02 }}
                      className={`relative cursor-pointer rounded-lg border p-4 transition-all ${
                        selectedProductIds.includes(product.id)
                          ? 'border-primary bg-primary/5 ring-2 ring-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => toggleProductSelection(product.id)}
                    >
                      <div className="absolute right-2 top-2">
                        <Checkbox
                          checked={selectedProductIds.includes(product.id)}
                          onCheckedChange={() => toggleProductSelection(product.id)}
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-md bg-muted overflow-hidden flex-shrink-0">
                          {product.image_url ? (
                            <img
                              src={product.image_url}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <Package className="h-6 w-6 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium truncate">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.code || '-'}</p>
                          <p className="text-sm font-semibold text-primary">
                            {formatPrice(product.is_on_offer && product.original_price ? product.original_price : product.price)}
                          </p>
                        </div>
                      </div>
                      {product.is_on_offer && (
                        <Badge className="mt-2 bg-green-600">
                          -{product.discount_percentage}% activo
                        </Badge>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Product Dialog */}
      <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre *</Label>
                <Input
                  id="name"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="Nombre del producto"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">Código</Label>
                <Input
                  id="code"
                  value={productForm.code}
                  onChange={(e) => setProductForm({ ...productForm, code: e.target.value })}
                  placeholder="BD-001"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Select
                  value={productForm.category_id}
                  onValueChange={(value) => setProductForm({ ...productForm, category_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Precio (CLP) *</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                  placeholder="1000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Capacidad</Label>
              <Input
                id="capacity"
                value={productForm.capacity}
                onChange={(e) => setProductForm({ ...productForm, capacity: e.target.value })}
                placeholder="5L, 10L, 500ml..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                placeholder="Descripción del producto..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Imagen</Label>
              <div className="flex gap-4 items-start">
                {imagePreview && (
                  <div className="relative h-24 w-24 rounded-md overflow-hidden bg-muted">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview('');
                        setImageFile(null);
                        setProductForm({ ...productForm, image_url: '' });
                      }}
                      className="absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-border hover:border-primary transition-colors">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                  <span className="mt-1 text-xs text-muted-foreground">Subir</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-xs text-muted-foreground">
                O ingresa una URL de imagen:
              </p>
              <Input
                value={productForm.image_url}
                onChange={(e) => {
                  setProductForm({ ...productForm, image_url: e.target.value });
                  setImagePreview(e.target.value);
                }}
                placeholder="https://..."
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsProductDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleSaveProduct}
              disabled={isSaving}
              className="gradient-haddad text-primary-foreground"
            >
              {isSaving ? 'Guardando...' : editingProduct ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
