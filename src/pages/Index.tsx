import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import ChatBot from '@/components/ChatBot';
import Footer from '@/components/Footer';
import { products, Product } from '@/data/products';

const Index: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      {/* Products Section */}
      <section id="products" className="container px-4 py-12 md:py-16">
        <div className="mb-8 text-center">
          <h2 className="mb-3 font-display text-3xl font-bold text-foreground md:text-4xl">
            Nuestros Productos
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Explora nuestro catálogo completo de productos plásticos reciclables de alta calidad
          </p>
        </div>

        <div className="mb-8">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Results Count */}
        <p className="mb-6 text-sm text-muted-foreground">
          Mostrando {filteredProducts.length} de {products.length} productos
        </p>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">
              No se encontraron productos con esos criterios.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Todos');
              }}
              className="mt-4 text-primary hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </section>

      <Footer />
      <ChatBot />
      
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Index;
