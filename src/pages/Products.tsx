import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { mockProducts } from '@/data/mockProducts';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter, ShoppingBag, Heart, ArrowLeft, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const categories = [
  { id: 'all', name: 'Toate', count: mockProducts.length },
  { id: 'vin', name: 'Vinuri', count: mockProducts.filter(p => p.category === 'vin').length },
  { id: 'dulciuri', name: 'Dulciuri', count: mockProducts.filter(p => p.category === 'dulciuri').length },
  { id: 'gourmet', name: 'Gourmet', count: mockProducts.filter(p => p.category === 'gourmet').length },
  { id: 'home', name: 'Home', count: mockProducts.filter(p => p.category === 'home').length },
  { id: 'beauty', name: 'Beauty', count: mockProducts.filter(p => p.category === 'beauty').length },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const tagFromUrl = searchParams.get('tag');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTag, setActiveTag] = useState<string | null>(tagFromUrl);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesTag = !activeTag || product.tags.includes(activeTag);
      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchQuery, selectedCategory, activeTag]);

  const handleAddToCart = (product: typeof mockProducts[0]) => {
    toast({ title: 'Adăugat în coș', description: product.name });
  };

  const clearTag = () => {
    setActiveTag(null);
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="w-4 h-4" /> Înapoi
            </button>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-display mb-4">Produse</motion.h1>
            {activeTag && (
              <Badge variant="outline" className="gap-1">{activeTag}<button onClick={clearTag}><X className="w-3 h-3" /></button></Badge>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 shrink-0">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Caută produse..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 bg-secondary/30" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold mb-4 flex items-center gap-2"><Filter className="w-4 h-4" />Categorii</h3>
                {categories.map(cat => (
                  <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${selectedCategory === cat.id ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary/50'}`}>
                    <span>{cat.name}</span><span className="text-sm opacity-70">{cat.count}</span>
                  </button>
                ))}
              </div>
            </aside>

            <div className="flex-1">
              <p className="text-muted-foreground mb-6">{filteredProducts.length} produse găsite</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                    <Card className="group overflow-hidden bg-secondary/20 border-border/30 hover:border-primary/30 transition-all">
                      <div className="aspect-square relative overflow-hidden">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        {!product.inStock && <div className="absolute inset-0 bg-background/80 flex items-center justify-center"><span className="text-muted-foreground">Indisponibil</span></div>}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {product.tags.slice(0, 2).map(tag => (<Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>))}
                        </div>
                        <h3 className="font-semibold mb-1 line-clamp-1">{product.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary">{product.price} RON</span>
                          <Button size="sm" onClick={() => handleAddToCart(product)} disabled={!product.inStock}><ShoppingBag className="w-4 h-4 mr-1" />Adaugă</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg">Nu am găsit produse</p>
                  <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); clearTag(); }} className="mt-4">Resetează filtrele</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
