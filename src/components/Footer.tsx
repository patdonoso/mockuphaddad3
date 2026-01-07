import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import logoHaddad from '@/assets/logo-haddad.png';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border/50 bg-card">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <img 
              src={logoHaddad} 
              alt="Haddad" 
              className="h-16 w-auto"
            />
            <p className="text-sm text-muted-foreground">
              Líder en productos plásticos reciclables en Chile desde hace más de 40 años.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-display text-lg font-semibold text-foreground">
              Categorías
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="transition-colors hover:text-primary cursor-pointer">Bidones</li>
              <li className="transition-colors hover:text-primary cursor-pointer">Envases PET</li>
              <li className="transition-colors hover:text-primary cursor-pointer">Productos Industriales</li>
              <li className="transition-colors hover:text-primary cursor-pointer">Jardinería</li>
              <li className="transition-colors hover:text-primary cursor-pointer">Artículos de Hogar</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 font-display text-lg font-semibold text-foreground">
              Contacto
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>Santiago, Chile</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span>+56 2 2345 6789</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <span>contacto@haddad.cl</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="mb-4 font-display text-lg font-semibold text-foreground">
              Horario de Atención
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p>Lunes a Viernes</p>
                  <p className="font-medium text-foreground">9:00 - 18:00</p>
                </div>
              </li>
              <li className="flex items-start gap-2 pl-6">
                <div>
                  <p>Sábados</p>
                  <p className="font-medium text-foreground">9:00 - 13:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border/50 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Haddad M.R. Todos los derechos reservados.
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span className="cursor-pointer transition-colors hover:text-primary">
                Términos y Condiciones
              </span>
              <span className="cursor-pointer transition-colors hover:text-primary">
                Política de Privacidad
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
