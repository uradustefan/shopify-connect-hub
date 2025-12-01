import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PageTransition } from "@/components/PageTransition";

const Contact = () => {
  const bannerRef = useRef(null);
  const isBannerInView = useInView(bannerRef, { once: true });
  const formRef = useRef(null);
  const isFormInView = useInView(formRef, { once: true });
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    
    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <PageTransition>
      <div className="bg-background">
        <Navigation />
      
      {/* Banner */}
      <section ref={bannerRef} className="relative min-h-[50vh] flex items-center justify-center px-12 pt-32 pb-24">
        <div className="container mx-auto text-center max-w-5xl">
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={isBannerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex justify-center items-center gap-2 text-sm text-muted-foreground mb-12"
          >
            <a href="/" className="hover:text-primary transition-colors">Homepage</a>
            <span>/</span>
            <span className="text-foreground">Contact</span>
          </motion.nav>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isBannerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[34px] md:text-[60px] lg:text-[90px] font-medium leading-[1.1] mb-8"
          >
            Get in <span className="text-primary">Touch!</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isBannerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </motion.p>
        </div>
      </section>

      {/* Map */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full h-full"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1396.5769090312324!2d-73.6519672!3d45.5673453!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91f8abc30e0ff%3A0xfc6d9cbb49022e9c!2sManoir%20Saint-Joseph!5e0!3m2!1sen!2sua!4v1685485811069!5m2!1sen!2sua"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale hover:grayscale-0 transition-all duration-500"
          />
        </motion.div>
      </section>

      {/* Contact Form */}
      <section ref={formRef} className="py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isFormInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-medium text-center mb-16"
          >
            Let's <span className="text-primary">Talk</span>
          </motion.h3>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={isFormInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="What's your name?"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-14 text-base"
                />
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-14 text-base"
                />
              </div>
            </div>

            <div>
              <Textarea
                name="message"
                placeholder="Tell us about your project"
                value={formData.message}
                onChange={handleChange}
                required
                rows={8}
                className="text-base resize-none"
              />
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-6">
              <p className="text-sm text-muted-foreground">
                <span className="text-primary">*</span> We promise not to disclose your personal information to third parties.
              </p>
              <Button type="submit" size="lg" className="group">
                Send message
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center p-8 rounded-lg hover:bg-background transition-colors"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-lg font-medium mb-3">Visit Us</h4>
              <p className="text-muted-foreground text-sm">
                71 South Los Carneros Road<br />
                California
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center p-8 rounded-lg hover:bg-background transition-colors"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-lg font-medium mb-3">Call Us</h4>
              <p className="text-muted-foreground text-sm">
                +51 174 705 812<br />
                +31 174 705 811
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center p-8 rounded-lg hover:bg-background transition-colors"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-lg font-medium mb-3">Email Us</h4>
              <p className="text-muted-foreground text-sm">
                info@givaora.com<br />
                support@givaora.com
              </p>
            </motion.div>
          </div>
        </div>
      </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Contact;
