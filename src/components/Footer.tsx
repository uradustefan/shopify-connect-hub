import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "./ui/button";

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
            <div className="flex items-center gap-2 mt-4">
              <div className="w-10 h-6 bg-orange-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">MC</span>
              </div>
              <div className="w-10 h-6 bg-red-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">●●</span>
              </div>
              <div className="w-10 h-6 bg-blue-700 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">VISA</span>
              </div>
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

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-white/20 pt-6 text-center"
        >
          <p className="text-white/60 text-sm">
            © 2025 GIVAORA. Toate drepturile rezervate.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};