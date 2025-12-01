import { useEffect, useRef } from 'react';
import { Home, ShoppingBag, Gift, Heart, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';

interface BottomNavProps {
  isVisible: boolean;
}

export const BottomNavigation = ({ isVisible }: BottomNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!navRef.current) return;

    if (isVisible) {
      gsap.to(navRef.current, {
        y: '0%',
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to(navRef.current, {
        y: '100%',
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  }, [isVisible]);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', icon: Home, label: 'Acasă' },
    { path: '/shop', icon: ShoppingBag, label: 'Magazin' },
    { path: '/create', icon: Gift, label: 'Creează', isCenter: true },
    { path: '/favorites', icon: Heart, label: 'Favorite' },
    { path: '/profile', icon: User, label: 'Profil' }
  ];

  return (
    <nav
      ref={navRef}
      className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="h-20 px-4 flex items-center justify-around relative">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          if (item.isCenter) {
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="absolute left-1/2 -translate-x-1/2 -top-4 w-16 h-16 rounded-full bg-gradient-to-br from-[hsl(32,100%,50%)] to-[hsl(32,100%,40%)] flex items-center justify-center shadow-lg hover:scale-105 transition-transform create-button-glow"
                aria-label={item.label}
              >
                <Icon className="w-7 h-7 text-background" />
              </button>
            );
          }

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1 transition-colors min-w-[60px]"
              aria-label={item.label}
            >
              <Icon
                className={`w-5 h-5 transition-colors ${
                  active ? 'text-[hsl(32,100%,50%)]' : 'text-muted-foreground'
                }`}
              />
              <span
                className={`text-xs transition-colors ${
                  active ? 'text-[hsl(32,100%,50%)]' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
