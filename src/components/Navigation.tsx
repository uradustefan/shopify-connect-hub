import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/givaora-logo.svg";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border font-poppins"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img src={logo} alt="GIVAORA" className="h-10" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors">Home</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Projects</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Services</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Team</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Contact</a>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 pb-4 space-y-4"
          >
            <a href="#" className="block text-foreground hover:text-primary transition-colors">Home</a>
            <a href="#" className="block text-foreground hover:text-primary transition-colors">Projects</a>
            <a href="#" className="block text-foreground hover:text-primary transition-colors">Services</a>
            <a href="#" className="block text-foreground hover:text-primary transition-colors">Team</a>
            <a href="#" className="block text-foreground hover:text-primary transition-colors">Contact</a>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};
