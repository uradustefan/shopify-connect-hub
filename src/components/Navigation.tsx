import { useState, useEffect, useRef } from "react";
import { Menu, ShoppingCart, Heart } from "lucide-react";
import { MenuOverlay } from "./MenuOverlay";
import { useNavigationContext } from "@/contexts/NavigationContext";
import gsap from "gsap";

export const Navigation = () => {
  const { isMenuOpen, setMenuOpen } = useNavigationContext();
  const [cartCount] = useState(2);
  const [wishlistCount] = useState(3);
  const logoRef = useRef<HTMLSpanElement>(null);

  // Mock navigate function - replace with actual router navigation
  const handleNavigate = (screenId: string, params?: any) => {
    console.log('Navigate to:', screenId, params);
    // Add your actual navigation logic here
  };

  useEffect(() => {
    const isHomepage = window.location.pathname === '/';
    
    // Setăm logo-ul invizibil inițial
    if (logoRef.current) {
      gsap.set(logoRef.current, { x: "-100vw", opacity: 0 });
    }
    
    const animateLogo = () => {
      if (logoRef.current) {
        gsap.to(logoRef.current, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power4.out"
        });
      }
    };
    
    if (isHomepage) {
      // Pe homepage, așteaptă preloader-ul
      window.addEventListener('preloaderComplete', animateLogo);
      return () => window.removeEventListener('preloaderComplete', animateLogo);
    } else {
      // Pe alte pagini, animează imediat
      setTimeout(animateLogo, 100);
    }
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Verificăm dacă suntem deja pe homepage
    if (window.location.pathname === '/') {
      // Refresh + scroll to top
      window.location.reload();
    } else {
      // Navigăm la homepage
      window.location.href = '/';
    }
  };

  return (
    <>
      {/* Fixed Navigation */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-background border-b border-border">
        <div className="h-20 px-8 flex items-center justify-between overflow-hidden">
          <a href="/" onClick={handleLogoClick} className="flex items-center">
            <span ref={logoRef} className="text-[42px] font-medium gradient-logo" style={{ fontFamily: 'Runalto, sans-serif', letterSpacing: '0.376em' }}>
              GIVAORA
            </span>
          </a>
          
          <div className="flex items-center gap-2">
            {/* Wishlist Icon */}
            <button 
              className="relative p-2 hover:bg-muted/20 rounded-full transition-colors hidden md:flex"
              aria-label="Favorite"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-semibold">
                  {wishlistCount}
                </span>
              )}
            </button>
            
            {/* Cart Icon */}
            <button 
              className="relative p-2 hover:bg-muted/20 rounded-full transition-colors hidden md:flex"
              aria-label="Coș"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </button>
            
            {/* Menu Button */}
            <button
              onClick={() => setMenuOpen(!isMenuOpen)}
              className="w-12 h-12 flex items-center justify-center hover:bg-muted/20 rounded-full transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <MenuOverlay 
          navigate={handleNavigate}
          onClose={() => setMenuOpen(false)}
        />
      )}
    </>
  );
};
