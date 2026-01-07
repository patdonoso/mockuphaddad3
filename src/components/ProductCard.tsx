import React, { useState } from 'react';
import { Lock, Eye, Package } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Product, formatPrice } from '@/data/products';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, index }) => {
  const { isAuthenticated } = useAuth();
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card 
      className="group cursor-pointer overflow-hidden border-border/30 bg-card shadow-card-haddad transition-all duration-300 hover:-translate-y-1 hover:shadow-hover-haddad"
      style={{ 
        animationDelay: `${index * 50}ms`,
        animation: 'slideUp 0.5s ease-out forwards',
        opacity: 0
      }}
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-secondary to-muted">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Package className="h-12 w-12 animate-pulse text-muted-foreground/30" />
          </div>
        )}
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            className={`h-full w-full object-contain p-4 transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Package className="h-16 w-16 text-muted-foreground/50" />
          </div>
        )}
        
        {/* Category Badge */}
        <Badge 
          className="absolute left-3 top-3 bg-primary/90 text-primary-foreground backdrop-blur-sm"
        >
          {product.category}
        </Badge>
        
        {/* View Details Button */}
        <div className="absolute inset-0 flex items-center justify-center bg-primary/0 opacity-0 transition-all duration-300 group-hover:bg-primary/5 group-hover:opacity-100">
          <Button 
            size="sm" 
            className="gap-2 gradient-haddad text-primary-foreground shadow-haddad"
          >
            <Eye className="h-4 w-4" />
            Ver Detalles
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="mb-2 line-clamp-2 font-display text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
          {product.name}
        </h3>
        
        {product.capacity && (
          <p className="mb-2 text-sm text-muted-foreground">
            Capacidad: {product.capacity}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          {isAuthenticated ? (
            <p className="text-xl font-bold text-primary">
              {formatPrice(product.price)}
              <span className="ml-1 text-xs font-normal text-muted-foreground">+ IVA</span>
            </p>
          ) : (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Lock className="h-4 w-4" />
              <span className="text-sm">Inicia sesión para ver precio</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
