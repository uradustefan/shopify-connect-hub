import { motion } from "framer-motion";
export const Footer = () => {
  return <footer className="bg-background text-foreground font-poppins border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} viewport={{
          once: true
        }}>
            <a href="/" className="flex items-center">
              <span className="text-[32px] font-medium gradient-logo" style={{
              fontFamily: 'Runalto, sans-serif',
              letterSpacing: '0.376em'
            }}>
                GIVAORA
              </span>
            </a>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.1
        }} viewport={{
          once: true
        }}>
            <h6 className="text-sm font-semibold mb-4 text-muted-foreground">Projects</h6>
            <ul className="space-y-2">
              <li><a href="#" className="text-foreground hover:text-primary transition-colors">Interior design studio</a></li>
              <li><a href="#" className="text-foreground hover:text-primary transition-colors">Home Security Camera</a></li>
              <li><a href="#" className="text-foreground hover:text-primary transition-colors">Kemia Honest Skincare</a></li>
              <li><a href="#" className="text-foreground hover:text-primary transition-colors">Air Pro by Molekule</a></li>
            </ul>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} viewport={{
          once: true
        }}>
            <h6 className="text-sm font-semibold mb-4 text-muted-foreground">Useful links</h6>
            <ul className="space-y-2">
              <li><a href="#" className="text-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-foreground hover:text-primary transition-colors">Terms and conditions</a></li>
              <li><a href="#" className="text-foreground hover:text-primary transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-foreground hover:text-primary transition-colors">Careers</a></li>
            </ul>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.3
        }} viewport={{
          once: true
        }}>
            <h6 className="text-sm font-semibold mb-4 text-muted-foreground">Canada</h6>
            <p className="text-foreground mb-4">71 South Los Carneros Road, California</p>
            <p className="text-primary">+51 174 705 812</p>
            
            <h6 className="text-sm font-semibold mb-4 mt-6 text-muted-foreground">Germany</h6>
            <p className="text-foreground mb-4">Leehove 40, 2678 MC De Lier, Netherlands</p>
            <p className="text-primary">+31 174 705 811</p>
          </motion.div>
        </div>

        <motion.div initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} transition={{
        duration: 0.6,
        delay: 0.4
      }} viewport={{
        once: true
      }} className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">© 2025 GIVAORA. All rights reserved.</p>
          <a href="#" className="text-primary hover:text-primary/80 transition-colors text-sm mt-4 md:mt-0">Inapoi SUS</a>
        </motion.div>
      </div>
    </footer>;
};