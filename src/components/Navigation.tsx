import { useState } from "react";
import { Menu, ShoppingCart, Heart } from "lucide-react";
import { MenuOverlay } from "./MenuOverlay";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount] = useState(2);
  const [wishlistCount] = useState(3);

  // Mock navigate function - replace with actual router navigation
  const handleNavigate = (screenId: string, params?: any) => {
    console.log('Navigate to:', screenId, params);
    // Add your actual navigation logic here
  };

  return (
    <>
      {/* Fixed Navigation */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-background border-b border-border">
        <div className="h-20 px-8 flex items-center justify-between">
          <a href="/" className="flex items-center overflow-hidden">
            <span className="text-[42px] font-medium gradient-logo logo-reveal" style={{ fontFamily: 'Runalto, sans-serif', letterSpacing: '0.376em' }}>
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
