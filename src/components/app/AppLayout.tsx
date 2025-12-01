import { Outlet } from 'react-router-dom';
import { Navigation } from '../Navigation';
import { FloatingMenuButton } from '../FloatingMenuButton';
import { BottomNavigation } from './BottomNavigation';
import { NavigationProvider, useNavigationContext } from '@/contexts/NavigationContext';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AppLayoutContent = () => {
  const { scrollDirection, scrollY } = useScrollDirection(10);
  const { setMenuOpen } = useNavigationContext();
  const navRef = useRef<HTMLDivElement>(null);

  // Top bar visible când scroll UP sau la început
  const showTopBar = scrollDirection === 'up' || scrollY < 50;
  
  // Bottom nav visible când scroll DOWN sau la început
  const showBottomNav = scrollDirection === 'down' || scrollDirection === null;
  
  // Floating button visible când top bar e ascunsă
  const showFloatingButton = !showTopBar && scrollY > 50;

  useEffect(() => {
    if (!navRef.current) return;

    if (showTopBar) {
      gsap.to(navRef.current, {
        y: '0%',
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to(navRef.current, {
        y: '-100%',
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  }, [showTopBar]);

  return (
    <div className="min-h-screen bg-background">
      <div ref={navRef}>
        <Navigation />
      </div>
      
      <FloatingMenuButton
        isVisible={showFloatingButton}
        onClick={() => setMenuOpen(true)}
      />

      <main className="pb-24 pt-20">
        <Outlet />
      </main>

      <BottomNavigation isVisible={showBottomNav} />
    </div>
  );
};

export const AppLayout = () => {
  return (
    <NavigationProvider>
      <AppLayoutContent />
    </NavigationProvider>
  );
};
