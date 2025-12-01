import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronRight, 
  Gift, 
  ShoppingBag, 
  ArrowLeft, 
  Star, 
  User, 
  DollarSign,
  Search,
  Heart,
  ShoppingCart,
  Truck,
  Instagram,
  Facebook,
  Mail,
  Phone
} from 'lucide-react';

interface MenuOverlayProps {
  navigate: (screenId: string, params?: any) => void;
  onClose: () => void;
}

const MENU_STRUCTURE = [
  { 
    title: "Crăciun", 
    id: "christmasSubmenu",
    icon: Gift 
  },
  { 
    title: "Gift BOX", 
    id: "giftBoxSubmenu",
    icon: ShoppingBag
  },
  { 
    title: "Categorii Principale", 
    id: "categoriesSubmenu",
    icon: ChevronRight
  },
  { title: "Blog", screenId: "blogList", icon: Star },
  { title: "Contul Meu", screenId: "accountDashboard", icon: User },
];

const SUBMENUS: Record<string, Array<{ title: string; screenId?: string; id?: string; icon?: any }>> = {
  christmasSubmenu: [
    { title: "Gift BOX de Crăciun", screenId: "listingGiftBoxCraciun" },
    { title: "Decorațiuni", id: "decorSubmenu" },
    { title: "Calendare Advent", id: "adventSubmenu" },
    { title: "Cadouri pentru...", id: "xmasGiftsSubmenu" },
  ],
  giftBoxSubmenu: [
    { title: "Toate Gift BOX-urile", screenId: "listingGiftBox" },
    { title: "Gift BOX cu Vin", screenId: "listingGiftBoxVin" },
    { title: "După Preț", id: "priceSubmenu", icon: DollarSign },
  ],
  priceSubmenu: [
    { title: "de la 150 RON", screenId: "listingGiftBoxPrice150" },
    { title: "de la 250 RON", screenId: "listingGiftBoxPrice250" },
    { title: "de la 500 RON", screenId: "listingGiftBoxPrice500" },
    { title: "de la 1000 RON", screenId: "listingGiftBoxPrice1000" },
  ],
  decorSubmenu: [
    { title: "Toate Globurile", screenId: "listingDecorGloburi" },
    { title: "Cu Alfabet", screenId: "listingDecorAlfabet" },
    { title: "Iconice Fortnum", screenId: "listingDecorFortnum" },
  ],
  adventSubmenu: [
    { title: "Festiv 2025", screenId: "listingAdventFestiv2025" },
    { title: "Ciocolată Copii", screenId: "listingAdventChocoKids2025" },
  ],
  xmasGiftsSubmenu: [
    { title: "Pentru Ea", screenId: "listingXmasForHer" },
    { title: "Pentru El", screenId: "listingXmasForHim" },
    { title: "Cei Mici", screenId: "listingXmasKids" },
    { title: "Gurmanzi", screenId: "listingXmasGurmand" },
    { title: "Personalizate", screenId: "listingXmasPersonalized" },
  ],
  categoriesSubmenu: [
    { title: "Alimente", screenId: "listingAlimente" },
    { title: "Cafea & Ceai", screenId: "listingCafeaCeai" },
    { title: "Dulciuri", screenId: "listingDulciuri" },
    { title: "Alcoolice", screenId: "listingAlcoolice" },
    { title: "Rame Foto", screenId: "listingRameFoto" },
    { title: "Jucării", screenId: "listingJucarii" },
    { title: "Măști", screenId: "listingMasti" },
    { title: "Îngrijire", screenId: "listingIngrijire" },
  ]
};

export function MenuOverlay({ navigate, onClose }: MenuOverlayProps) {
  const [history, setHistory] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlistCount] = useState(3);
  const [cartCount] = useState(2);

  const activeSubmenuId = history.length > 0 ? history[history.length - 1] : null;
  const currentItems = activeSubmenuId ? SUBMENUS[activeSubmenuId] : MENU_STRUCTURE;

  // Keyboard accessibility
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleItemClick = (item: any) => {
    if (item.screenId) {
      navigate(item.screenId, { title: item.title });
      onClose();
    } else if (item.id) {
      setHistory([...history, item.id]);
    }
  };

  const handleBack = () => {
    if (history.length > 0) {
      setHistory(history.slice(0, -1));
    } else {
      onClose();
    }
  };

  const getSubmenuTitle = (id: string) => {
    const parentItem = MENU_STRUCTURE.find(item => item.id === id) || 
                       Object.values(SUBMENUS).flat().find(item => item.id === id);
    return parentItem?.title || '';
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop Blur */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
          onClick={onClose}
        />

        {/* Drawer Content */}
        <motion.div 
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full max-w-sm h-full bg-background border-l border-border shadow-2xl flex flex-col"
        >
          
          {/* Header with Search & Actions */}
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
                  {history.length === 0 ? 'MENU' : 'ÎNAPOI'}
                </h2>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  className="relative p-2 hover:bg-muted/20 rounded-full transition-colors"
                  aria-label="Favorite"
                >
                  <Heart className="w-5 h-5 text-foreground" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-semibold">
                      {wishlistCount}
                    </span>
                  )}
                </button>
                <button 
                  className="relative p-2 hover:bg-muted/20 rounded-full transition-colors"
                  aria-label="Coș"
                >
                  <ShoppingCart className="w-5 h-5 text-foreground" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-semibold">
                      {cartCount}
                    </span>
                  )}
                </button>
                <button 
                  onClick={onClose} 
                  className="p-2 hover:bg-muted/20 rounded-full transition-colors ml-1"
                  aria-label="Închide"
                >
                  <X className="w-6 h-6 text-foreground" />
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="px-5 pb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="search"
                  placeholder="Caută produse..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-muted/20 rounded-lg border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            {/* Breadcrumb Navigation */}
            {history.length > 0 && (
              <div className="px-5 pb-3 flex items-center gap-1 text-xs text-muted-foreground overflow-x-auto">
                <span>Menu</span>
                {history.map((id, idx) => (
                  <React.Fragment key={id}>
                    <ChevronRight className="w-3 h-3 flex-shrink-0" />
                    <span className="whitespace-nowrap">{getSubmenuTitle(id)}</span>
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>

          {/* Promotional Banner */}
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
            {currentItems.map((item, idx) => (
              <motion.button
                key={`${item.title}-${idx}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => handleItemClick(item)}
                className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-card transition-all group border border-transparent hover:border-border"
              >
                <div className="flex items-center gap-4">
                  {item.icon && (
                    <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  )}
                  <span className="text-base font-medium text-foreground group-hover:pl-1 transition-all">
                    {item.title}
                  </span>
                </div>
                {(item.id || (!item.screenId && !item.icon)) && (
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                )}
              </motion.button>
            ))}
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-border space-y-4">
            {/* Login Button */}
            <button 
              onClick={() => { navigate('login'); onClose(); }}
              className="w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-bold text-sm tracking-wide hover:bg-primary/90 transition-colors"
            >
              AUTENTIFICARE
            </button>
            
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
            
            {/* Contact Info */}
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