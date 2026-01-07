import React, { useState } from 'react';
import { Lock, Package, Tag, Ruler, Mail, Phone } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { formatPrice } from '@/hooks/useProducts';
import { useNavigate } from 'react-router-dom';
import type { ProductCardData } from './ProductCard';

interface ProductModalProps {
  product: ProductCardData | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  if (!product) return null;

  const handleLoginClick = () => {
    onClose();
    navigate('/auth');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-2xl border-border/30 bg-card p-0 shadow-hover-haddad">
        <div className="relative">
          {/* Image Section */}
          <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-secondary to-muted">
            {!imageError && product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain p-8"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Package className="h-24 w-24 text-muted-foreground/50" />
              </div>
            )}
            <Badge 
              className="absolute left-4 top-4 bg-primary/90 text-primary-foreground backdrop-blur-sm"
            >
              {product.category}
            </Badge>
            {product.is_on_offer && product.discount_percentage && (
              <Badge 
                className="absolute right-4 top-4 bg-green-600 text-white"
              >
                -{product.discount_percentage}% OFF
              </Badge>
            )}
          </div>

          <div className="p-6">
            <DialogHeader className="mb-4">
              <DialogTitle className="font-display text-2xl font-bold text-foreground">
                {product.name}
              </DialogTitle>
            </DialogHeader>

            <p className="mb-6 text-muted-foreground">
              {product.description}
            </p>

            <div className="mb-6 grid grid-cols-2 gap-4">
              {product.code && (
                <div className="flex items-center gap-3 rounded-xl bg-secondary/50 p-3">
                  <Tag className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Código</p>
                    <p className="font-medium text-foreground">{product.code}</p>
                  </div>
                </div>
              )}
              {product.capacity && (
                <div className="flex items-center gap-3 rounded-xl bg-secondary/50 p-3">
                  <Ruler className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Capacidad</p>
                    <p className="font-medium text-foreground">{product.capacity}</p>
                  </div>
                </div>
              )}
            </div>

            <Separator className="mb-6" />

            {/* Price Section */}
            <div className="mb-6">
              <p className="mb-2 text-sm font-medium text-muted-foreground">Precio Neto</p>
              {isAuthenticated ? (
                <div className="flex items-baseline gap-2">
                  {product.is_on_offer && product.original_price ? (
                    <>
                      <span className="text-lg text-muted-foreground line-through">
                        {formatPrice(product.original_price)}
                      </span>
                      <span className="text-3xl font-bold text-green-600">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-sm text-muted-foreground">+ IVA</span>
                    </>
                  ) : (
                    <>
                      <span className="text-3xl font-bold text-primary">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-sm text-muted-foreground">+ IVA</span>
                    </>
                  )}
                </div>
              ) : (
                <div className="rounded-xl bg-secondary/50 p-4">
                  <div className="mb-3 flex items-center gap-2 text-muted-foreground">
                    <Lock className="h-5 w-5" />
                    <span className="font-medium">Precio oculto</span>
                  </div>
                  <p className="mb-3 text-sm text-muted-foreground">
                    Inicia sesión o regístrate para ver los precios de nuestros productos.
                  </p>
                  <Button 
                    onClick={handleLoginClick}
                    className="w-full gradient-haddad text-primary-foreground shadow-haddad hover:opacity-90"
                  >
                    Iniciar Sesión
                  </Button>
                </div>
              )}
            </div>

            {/* Contact Section */}
            <div className="rounded-xl bg-muted/50 p-4">
              <p className="mb-3 font-medium text-foreground">¿Interesado en este producto?</p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button variant="outline" className="flex-1 gap-2">
                  <Mail className="h-4 w-4" />
                  Cotizar
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Phone className="h-4 w-4" />
                  Contactar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
