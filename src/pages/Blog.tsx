import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Tag } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const blogPosts = [
  {
    id: 1,
    title: "How to Become a Graphic Designer in 10 Simple Steps",
    excerpt: "Discover the essential steps to kickstart your career in graphic design. From mastering the basics to building your portfolio, we'll guide you through everything you need to know.",
    category: "DESIGN",
    date: "May 24 2023",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "16 Best Graphic Design Online and Offline Courses",
    excerpt: "Looking to enhance your design skills? We've compiled a list of the best online and offline courses that will help you master graphic design and take your career to the next level.",
    category: "EDUCATION",
    date: "May 20 2023",
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "How to Never Reach Creative Burnout",
    excerpt: "Creative burnout is real, but it doesn't have to be inevitable. Learn practical strategies to maintain your creative energy and stay inspired throughout your career.",
    category: "WELLNESS",
    date: "May 18 2023",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "How to Create a Brand Guide for Your Client",
    excerpt: "A comprehensive brand guide is essential for maintaining consistency. Learn how to create professional brand guidelines that will help your clients succeed.",
    category: "BRANDING",
    date: "May 15 2023",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "The Future of Design: Trends to Watch in 2024",
    excerpt: "Stay ahead of the curve with our comprehensive guide to the design trends that will shape 2024. From AI-powered tools to sustainable design practices.",
    category: "TRENDS",
    date: "May 12 2023",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Building Your Design Portfolio: A Complete Guide",
    excerpt: "Your portfolio is your most powerful tool. Learn how to curate and present your work in a way that attracts clients and showcases your unique style.",
    category: "CAREER",
    date: "May 10 2023",
    image: "https://images.unsplash.com/photo-1487611459768-bd414656ea10?q=80&w=1200&auto=format&fit=crop"
  }
];

const Blog = () => {
  const bannerRef = useRef(null);
  const isBannerInView = useInView(bannerRef, { once: true });
  const popularRef = useRef(null);
  const isPopularInView = useInView(popularRef, { once: true });
  const allPostsRef = useRef(null);
  const isAllPostsInView = useInView(allPostsRef, { once: true });

  useEffect(() => {
    const elements = document.querySelectorAll(".mil-up");
    
    elements.forEach((element) => {
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    });
  }, []);

  return (
    <div className="bg-background">
      <Navigation />
      
      {/* Banner */}
      <section ref={bannerRef} className="relative min-h-[60vh] flex items-center justify-center px-12 pt-32 pb-24">
        <div className="container mx-auto text-center max-w-5xl">
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={isBannerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex justify-center items-center gap-2 text-sm text-muted-foreground mb-12"
          >
            <a href="/" className="hover:text-primary transition-colors">Homepage</a>
            <span>/</span>
            <span className="text-foreground">Blog</span>
          </motion.nav>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isBannerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[34px] md:text-[60px] lg:text-[90px] font-medium leading-[1.1] mb-8"
          >
            Exploring <span className="text-primary">the World</span> <br />
            Through Our <span className="text-primary">Blog</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isBannerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button variant="outline">
              View Publications
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Popular Posts */}
      <section ref={popularRef} className="py-24 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={isPopularInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-medium"
            >
              Popular Publications
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isPopularInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Button variant="ghost" className="group">
                View all
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Button>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.slice(0, 2).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isPopularInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden group cursor-pointer border-border hover:border-primary transition-all duration-300">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex gap-3 mb-4">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                        <Tag className="w-3 h-3" />
                        {post.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                    </div>
                    <h4 className="text-xl md:text-2xl font-medium mb-4 group-hover:text-primary transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-muted-foreground mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Button variant="ghost" className="group/btn p-0">
                      Read more
                      <span className="ml-2 group-hover/btn:translate-x-1 transition-transform">→</span>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section ref={allPostsRef} className="py-24">
        <div className="container mx-auto px-6">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isAllPostsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-medium mb-12"
          >
            Latest Articles
          </motion.h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isAllPostsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden group cursor-pointer border-border hover:border-primary transition-all duration-300 h-full flex flex-col">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex gap-3 mb-4">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                        <Tag className="w-3 h-3" />
                        {post.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                    </div>
                    <h4 className="text-lg md:text-xl font-medium mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <Button variant="ghost" className="group/btn p-0 self-start">
                      Read more
                      <span className="ml-2 group-hover/btn:translate-x-1 transition-transform">→</span>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
