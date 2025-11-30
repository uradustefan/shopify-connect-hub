import { useState } from "react";
import { Menu, X } from "lucide-react";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Fixed Frame Navigation */}
      <div className="fixed inset-0 pointer-events-none z-40">
        <div className="absolute top-0 left-0 right-0 h-12 bg-background border-b border-border pointer-events-auto">
          <div className="h-full px-8 flex items-center justify-between">
            <a href="/" className="text-[42px] font-medium leading-none text-primary">
              A.
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-12 h-12 flex items-center justify-center"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="absolute top-0 bottom-0 left-0 w-12 bg-background border-r border-border" />
        <div className="absolute top-0 bottom-0 right-0 w-12 bg-background border-l border-border" />
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-background border-t border-border" />
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
