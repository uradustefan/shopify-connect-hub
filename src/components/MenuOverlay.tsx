import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronRight, 
  ArrowLeft, 
  Search,
  Truck,
  Instagram,
  Facebook,
  Mail,
  Phone,
  User,
  LayoutDashboard,
  LogOut,
  Package,
  Crown
} from 'lucide-react';
import { useWishlistStore } from '@/stores/wishlistStore';
import { useCartStore } from '@/stores/cartStore';
import { useAuth } from '@/contexts/AuthContext';
import { WishlistDrawer } from './WishlistDrawer';
import { CartDrawer } from './CartDrawer';
import { menuHamburgerRO } from '@/data/menuStructure';
import { MenuItem } from '@/types/giftbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface MenuOverlayProps {
  onClose: () => void;
}

export function MenuOverlay({ onClose }: MenuOverlayProps) {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const [history, setHistory] = useState<{ title: string; items: MenuItem[] }[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const wishlistCount = useWishlistStore(state => state.items.length);
  const cartCount = useCartStore(state => state.items.reduce((sum, item) => sum + item.quantity, 0));

  const currentLevel = history.length > 0 ? history[history.length - 1] : null;
  const currentItems = currentLevel ? currentLevel.items : menuHamburgerRO;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleItemClick = (item: MenuItem) => {
    if (item.href) {
      navigate(item.href);
      onClose();
    } else if (item.tag) {
      navigate(`/products?tag=${item.tag}`);
      onClose();
    } else if (item.children && item.children.length > 0) {
      setHistory([...history, { title: item.title, items: item.children }]);
    }
  };

  const handleBack = () => {
    if (history.length > 0) {
      setHistory(history.slice(0, -1));
    } else {
      onClose();
    }
  };

  const handleAuth = () => {
    navigate('/auth');
    onClose();
  };

  const handleDashboard = () => {
    navigate('/dashboard');
    onClose();
  };

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  const filteredItems = searchQuery 
    ? currentItems.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentItems;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
          onClick={onClose}
        />

        {/* Drawer */}
        <motion.div 
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full max-w-sm h-full bg-background border-l border-border shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="border-b border-border">
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3">
                {history.length > 0 && (
                  <button 
                    onClick={handleBack} 
                    className="p-2 hover:bg-muted/20 rounded-full transition-colors"
                    aria-label="Înapoi"
                  >
                    <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                  </button>
                )}
                <h2 className="text-lg font-semibold tracking-wide text-primary">
                  {history.length === 0 ? 'MENU' : currentLevel?.title || 'ÎNAPOI'}
                </h2>
              </div>
              
              <div className="flex items-center gap-2">
                <WishlistDrawer />
                <CartDrawer />
                <button
                  onClick={onClose} 
                  className="p-2 hover:bg-muted/20 rounded-full transition-colors ml-1"
                  aria-label="Închide"
                >
                  <X className="w-6 h-6 text-foreground" />
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="px-5 pb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="search"
                  placeholder="Caută în menu..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-muted/20 rounded-lg border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            {/* Breadcrumbs */}
            {history.length > 0 && (
              <div className="px-5 pb-3 flex items-center gap-1 text-xs text-muted-foreground overflow-x-auto">
                <button onClick={() => setHistory([])} className="hover:text-primary transition-colors">
                  Menu
                </button>
                {history.map((level, idx) => (
                  <React.Fragment key={idx}>
                    <ChevronRight className="w-3 h-3 flex-shrink-0" />
                    <button 
                      onClick={() => setHistory(history.slice(0, idx + 1))}
                      className="whitespace-nowrap hover:text-primary transition-colors"
                    >
                      {level.title}
                    </button>
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>

          {/* Promo Banner */}
          <div className="mx-4 mt-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground">Livrare GRATUITĂ peste 200 RON</span>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={history.length}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-2"
              >
                {filteredItems.map((item, idx) => (
                  <motion.button
                    key={`${item.title}-${idx}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    onClick={() => handleItemClick(item)}
                    className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-card transition-all group border border-transparent hover:border-border"
                  >
                    <span className="text-base font-medium text-foreground group-hover:pl-1 transition-all">
                      {item.title}
                    </span>
                    {item.children && item.children.length > 0 && (
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    )}
                    {item.tag && (
                      <Badge variant="outline" className="text-xs">
                        {item.tag}
                      </Badge>
                    )}
                  </motion.button>
                ))}

                {/* Quick Links when at root */}
                {history.length === 0 && (
                  <>
                    <div className="pt-4 border-t border-border mt-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 px-4">
                        Acces Rapid
                      </p>
                      <button
                        onClick={() => { navigate('/products'); onClose(); }}
                        className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-card transition-all group border border-transparent hover:border-border"
                      >
                        <Package className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-base font-medium text-foreground">Toate Produsele</span>
                      </button>
                      <button
                        onClick={() => { navigate('/create-box'); onClose(); }}
                        className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-card transition-all group border border-transparent hover:border-border"
                      >
                        <Crown className="w-5 h-5 text-primary" />
                        <span className="text-base font-medium text-foreground">Creează Gift BOX</span>
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer - Auth Section */}
          <div className="p-5 border-t border-border space-y-4">
            {user && profile ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-card rounded-lg">
                  <Avatar className="h-10 w-10 border border-primary">
                    <AvatarImage src={profile.avatarUrl} />
                    <AvatarFallback className="bg-secondary text-foreground">
                      {profile.fullName?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {profile.fullName || profile.username || 'User'}
                    </p>
                    <Badge variant="outline" className="text-xs capitalize">
                      {profile.plan}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={handleDashboard}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </button>
                  <button 
                    onClick={handleSignOut}
                    className="px-4 py-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={handleAuth}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg bg-primary text-primary-foreground font-bold text-sm tracking-wide hover:bg-primary/90 transition-colors"
              >
                <User className="w-4 h-4" />
                AUTENTIFICARE
              </button>
            )}
            
            {/* Social Links */}
            <div className="flex justify-center gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 hover:bg-muted/20 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 hover:bg-muted/20 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
              <a 
                href="mailto:contact@givaora.com"
                className="p-2 hover:bg-muted/20 rounded-full transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
            </div>
            
            <a 
              href="tel:+40712345678" 
              className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+40 712 345 678</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
