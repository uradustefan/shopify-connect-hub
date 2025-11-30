import { useState } from "react";
import { Menu, X } from "lucide-react";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Fixed Navigation */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-background border-b border-border">
        <div className="h-20 px-8 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <span className="text-[42px] font-medium" style={{ fontFamily: 'Runalto, sans-serif', letterSpacing: '0.376em' }}>
              GIVAORA
            </span>
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-12 h-12 flex items-center justify-center"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Fullscreen Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center"
          >
            <X className="w-6 h-6" />
          </button>
          
          <nav className="text-center space-y-6">
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="block text-6xl md:text-8xl font-medium hover:text-primary transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="block text-6xl md:text-8xl font-medium hover:text-primary transition-colors"
            >
              Projects
            </a>
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="block text-6xl md:text-8xl font-medium hover:text-primary transition-colors"
            >
              Services
            </a>
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="block text-6xl md:text-8xl font-medium hover:text-primary transition-colors"
            >
              Team
            </a>
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="block text-6xl md:text-8xl font-medium hover:text-primary transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </>
  );
};
