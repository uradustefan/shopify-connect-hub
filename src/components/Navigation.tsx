import { useState, useEffect, useRef } from "react";
import { Menu } from "lucide-react";
import { MenuOverlay } from "./MenuOverlay";
import { CartDrawer } from "./CartDrawer";
import { WishlistDrawer } from "./WishlistDrawer";
import gsap from "gsap";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
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
            {/* Wishlist Drawer */}
            <div className="hidden md:flex">
              <WishlistDrawer />
            </div>
            
            {/* Cart Drawer */}
            <CartDrawer />
            
            {/* Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-12 h-12 flex items-center justify-center hover:bg-muted/20 rounded-full transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Menu Overlay */}
      {isOpen && (
        <MenuOverlay 
          navigate={handleNavigate}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
