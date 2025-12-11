import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "./ui/button";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground font-poppins">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Servicii pentru clienți */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h6 className="text-base font-medium mb-4 text-primary-foreground/90">
              Servicii pentru clienți
            </h6>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Deschiderea coletului la livrare
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  30 de zile drept de retur
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Plata cu cardul în rate fără dobândă
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Finanțare în rate prin eCredit
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Garanții și service
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Black Friday GIVAORA
                </a>
              </li>
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
            <h6 className="text-base font-medium mb-4 text-primary-foreground/90">
              Comenzi și livrare
            </h6>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Contul meu la GIVAORA
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Livrarea comenzilor
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  GIVAORA Corporate
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  GIVAORA Marketplace
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Modalități de finanțare și plată
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Vreau să vând pe GIVAORA
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Suport clienți */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h6 className="text-base font-medium mb-4 text-primary-foreground/90">
              Suport clienți
            </h6>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Formular returnare produs
                </a>
              </li>
              <li>
                <a href="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Anunțuri rechemare produse
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Condiții generale privind furnizarea serviciilor poștale
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  PROTECȚIA CONSUMATORILOR - A.N.P.C. – SAL
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  PROTECȚIA CONSUMATORILOR - A.N.P.C.
                </a>
              </li>
            </ul>
            {/* Suport online button */}
            <Button 
              className="mt-4 bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-6"
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
            <h6 className="text-base font-medium mb-4 text-primary-foreground/90">
              GIVAORA
            </h6>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Despre GIVAORA
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Termene și condiții
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Prelucrarea datelor cu caracter personal
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Politica de utilizare Cookie-uri
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Soluționarea Online a litigiilor
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Programele Fundației Nouă ne pasă
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-primary-foreground/20 pt-6 text-center"
        >
          <p className="text-primary-foreground/60 text-sm">
            © 2025 GIVAORA. Toate drepturile rezervate.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};