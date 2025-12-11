import { motion } from "framer-motion";
import { MessageCircle, Facebook, Instagram } from "lucide-react";
import { Button } from "./ui/button";

// TikTok icon (not in lucide-react)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

// Payment icons as SVG
const MastercardIcon = () => (
  <svg viewBox="0 0 48 32" className="h-6 w-10">
    <rect width="48" height="32" rx="4" fill="#1A1F36"/>
    <circle cx="18" cy="16" r="9" fill="#EB001B"/>
    <circle cx="30" cy="16" r="9" fill="#F79E1B"/>
    <path d="M24 9.5a9 9 0 0 0 0 13" fill="#FF5F00"/>
  </svg>
);

const VisaIcon = () => (
  <svg viewBox="0 0 48 32" className="h-6 w-10">
    <rect width="48" height="32" rx="4" fill="#1A1F71"/>
    <text x="24" y="19" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontStyle="italic">VISA</text>
  </svg>
);

const PayPalIcon = () => (
  <svg viewBox="0 0 48 32" className="h-6 w-10">
    <rect width="48" height="32" rx="4" fill="#003087"/>
    <text x="24" y="18" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">PayPal</text>
  </svg>
);

// Hover link component with ashley-style animation
const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <a 
      href={href} 
      className="relative inline-block text-white/70 hover:text-white transition-colors duration-300 group"
    >
      <span className="relative">
        {children}
        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 ease-out group-hover:w-full" />
      </span>
    </a>
  </li>
);

export const Footer = () => {
  return (
    <footer className="bg-black text-white font-poppins">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Servicii pentru clienți */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h6 className="text-base font-medium mb-4 text-white/90">
              Servicii pentru clienți
            </h6>
            <ul className="space-y-2 text-sm">
              <FooterLink href="#">Deschiderea coletului la livrare</FooterLink>
              <FooterLink href="#">30 de zile drept de retur</FooterLink>
              <FooterLink href="#">Plata cu cardul în rate fără dobândă</FooterLink>
              <FooterLink href="#">Finanțare în rate prin eCredit</FooterLink>
              <FooterLink href="#">Garanții și service</FooterLink>
              <FooterLink href="#">Black Friday GIVAORA</FooterLink>
            </ul>
            {/* Payment icons */}
            <div className="flex items-center gap-3 mt-4">
              <MastercardIcon />
              <VisaIcon />
              <PayPalIcon />
            </div>
          </motion.div>

          {/* Comenzi și livrare */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h6 className="text-base font-medium mb-4 text-white/90">
              Comenzi și livrare
            </h6>
            <ul className="space-y-2 text-sm">
              <FooterLink href="#">Contul meu la GIVAORA</FooterLink>
              <FooterLink href="#">Livrarea comenzilor</FooterLink>
              <FooterLink href="#">GIVAORA Corporate</FooterLink>
              <FooterLink href="#">GIVAORA Marketplace</FooterLink>
              <FooterLink href="#">Modalități de finanțare și plată</FooterLink>
              <FooterLink href="#">Vreau să vând pe GIVAORA</FooterLink>
            </ul>
          </motion.div>

          {/* Suport clienți */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h6 className="text-base font-medium mb-4 text-white/90">
              Suport clienți
            </h6>
            <ul className="space-y-2 text-sm">
              <FooterLink href="#">Formular returnare produs</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
              <FooterLink href="#">Anunțuri rechemare produse</FooterLink>
              <FooterLink href="#">Condiții generale privind furnizarea serviciilor poștale</FooterLink>
              <FooterLink href="#">PROTECȚIA CONSUMATORILOR - A.N.P.C. – SAL</FooterLink>
              <FooterLink href="#">PROTECȚIA CONSUMATORILOR - A.N.P.C.</FooterLink>
            </ul>
            {/* Suport online button */}
            <Button 
              className="mt-4 bg-white text-black hover:bg-white/90 rounded-full px-6 transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Suport online
            </Button>
          </motion.div>

          {/* GIVAORA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h6 className="text-base font-medium mb-4 text-white/90">
              GIVAORA
            </h6>
            <ul className="space-y-2 text-sm">
              <FooterLink href="/about">Despre GIVAORA</FooterLink>
              <FooterLink href="#">Termene și condiții</FooterLink>
              <FooterLink href="#">Prelucrarea datelor cu caracter personal</FooterLink>
              <FooterLink href="#">Politica de utilizare Cookie-uri</FooterLink>
              <FooterLink href="#">Soluționarea Online a litigiilor</FooterLink>
              <FooterLink href="#">Programele Fundației Nouă ne pasă</FooterLink>
            </ul>
          </motion.div>
        </div>

        {/* Social Media & Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-white/20 pt-6"
        >
          {/* Social Media Links */}
          <div className="flex justify-center gap-6 mb-6">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors duration-300 hover:scale-110 transform"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors duration-300 hover:scale-110 transform"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a 
              href="https://tiktok.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors duration-300 hover:scale-110 transform"
            >
              <TikTokIcon className="w-6 h-6" />
            </a>
          </div>
          
          <p className="text-white/60 text-sm text-center">
            © 2025 GIVAORA. Toate drepturile rezervate.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};