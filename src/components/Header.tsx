import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import logoHaddad from '@/assets/logo-haddad.png';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <img 
            src={logoHaddad} 
            alt="Haddad" 
            className="h-12 w-auto"
          />
          <span className="hidden font-display text-xl font-semibold text-primary sm:inline-block">
            HADDAD
          </span>
        </Link>
        
        <nav className="flex items-center gap-4 md:gap-6">
          <Link 
            to="/conozcanos" 
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Conózcanos
          </Link>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 md:flex">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {user?.name}
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleLogout}
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Salir</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/auth')}
                className="gap-2"
              >
                <LogIn className="h-4 w-4" />
                <span>Ingresar</span>
              </Button>
              <Button 
                size="sm"
                onClick={() => navigate('/auth?mode=register')}
                className="gradient-haddad text-primary-foreground shadow-haddad hover:opacity-90"
              >
                Registrarse
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
