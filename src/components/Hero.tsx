import React from 'react';
import { ArrowDown, Recycle, Leaf, Award } from 'lucide-react';
import logoHaddad from '@/assets/logo-haddad.png';

const Hero: React.FC = () => {
  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden gradient-soft">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent blur-3xl" />
      </div>

      <div className="container relative px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          {/* Logo Animation */}
          <div className="mb-8 flex justify-center animate-fade-in">
            <img 
              src={logoHaddad} 
              alt="Haddad Productos Reciclables" 
              className="h-32 w-auto md:h-40"
            />
          </div>

          <h1 
            className="mb-6 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl animate-slide-up"
            style={{ animationDelay: '100ms' }}
          >
            Productos Reciclables de{' '}
            <span className="text-gradient-haddad">Alta Calidad</span>
          </h1>

          <p 
            className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl animate-slide-up"
            style={{ animationDelay: '200ms' }}
          >
            Más de 40 años liderando el mercado chileno de envases y productos plásticos reciclables. 
            Comprometidos con la calidad y el medio ambiente.
          </p>

          {/* Features */}
          <div 
            className="mb-10 flex flex-wrap justify-center gap-6 animate-slide-up"
            style={{ animationDelay: '300ms' }}
          >
            <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-card-haddad">
              <Recycle className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground">100% Reciclable</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-card-haddad">
              <Award className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Productos Certificados</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-card-haddad">
              <Leaf className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Eco-Friendly</span>
            </div>
          </div>

          {/* CTA Button */}
          <button 
            onClick={scrollToProducts}
            className="group flex items-center gap-2 mx-auto rounded-full gradient-haddad px-8 py-4 text-lg font-medium text-primary-foreground shadow-haddad transition-all hover:opacity-90 hover:shadow-hover-haddad animate-slide-up"
            style={{ animationDelay: '400ms' }}
          >
            Ver Catálogo
            <ArrowDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
          </button>
        </div>
      </div>

      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          viewBox="0 0 1440 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path 
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
