import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/lib/shopify';
import { ShopifyProduct } from '@/types/shopify';
import { useCartStore } from '@/stores/cartStore';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ShoppingBag, ArrowLeft, X, Gift, Sparkles, Crown, Star } from 'lucide-react';
import { toast } from 'sonner';

// Filter categories based on Shopify tags
const filterCategories = {
  destinatar: {
    title: 'Destinatar',
    filters: [
      { label: 'Pentru Ea', tag: 'pentru-ea' },
      { label: 'Pentru El', tag: 'pentru-el' },
      { label: 'Pentru Copii', tag: 'pentru-copii' },
      { label: 'Pentru Bebeluși', tag: 'pentru-bebelusi' },
      { label: 'Pentru Colegi', tag: 'pentru-colegi' },
      { label: 'Pentru Gurmanzi', tag: 'pentru-gurmanzi' },
      { label: 'Pentru Familie', tag: 'pentru-familie' },
      { label: 'Pentru Cuplu', tag: 'pentru-cuplu' },
    ]
  },
  ocazie: {
    title: 'Ocazie',
    filters: [
      { label: 'Crăciun', tag: 'craciun' },
      { label: 'Aniversare', tag: 'aniversare' },
      { label: 'Onomastică', tag: 'onomastica' },
      { label: 'Secret Santa', tag: 'secret-santa' },
      { label: 'Corporate', tag: 'corporate-gifts' },
    ]
  },
  buget: {
    title: 'Buget',
    filters: [
      { label: 'Sub 150 lei', tag: 'buget' },
      { label: '150–250 lei', tag: 'standard' },
      { label: '250–450 lei', tag: 'premium' },
      { label: 'Peste 450 lei', tag: 'luxury' },
    ]
  }
};

// Badge configuration for special tags
const tagBadges: Record<string, { icon: React.ReactNode; className: string }> = {
  'premium': { icon: <Crown className="w-3 h-3" />, className: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  'luxury': { icon: <Sparkles className="w-3 h-3" />, className: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  'craciun': { icon: <Star className="w-3 h-3" />, className: 'bg-red-500/20 text-red-400 border-red-500/30' },
};

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const addItem = useCartStore(state => state.addItem);
  
  const activeTag = searchParams.get('tag');

  // Fetch products from Shopify
  const { data, isLoading, error } = useQuery({
    queryKey: ['shopify-products'],
    queryFn: () => fetchProducts(50),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const products: ShopifyProduct[] = data?.data?.products?.edges || [];

  // Filter products by tag
  const filteredProducts = useMemo(() => {
    if (!activeTag) return products;
    return products.filter(product => 
      product.node.tags.some(tag => 
        tag.toLowerCase() === activeTag.toLowerCase()
      )
    );
  }, [products, activeTag]);

  // Get counts for each filter
  const getFilterCount = (tag: string) => {
    return products.filter(product => 
      product.node.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    ).length;
  };

  const handleAddToCart = (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) {
      toast.error('Produsul nu este disponibil');
      return;
    }

    addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || []
    });

    toast.success('Adăugat în coș', {
      description: product.node.title,
    });
  };

  const setFilter = (tag: string) => {
    setSearchParams({ tag });
  };

  const clearFilter = () => {
    setSearchParams({});
  };

  const formatPrice = (amount: string) => {
    return Math.round(parseFloat(amount)).toLocaleString('ro-RO');
  };

  // Get special badge for product
  const getProductBadge = (tags: string[]) => {
    for (const tag of tags) {
      const badge = tagBadges[tag.toLowerCase()];
      if (badge) return { tag, ...badge };
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <button 
              onClick={() => navigate('/')} 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Înapoi
            </button>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <h1 className="text-4xl md:text-5xl font-display mb-2">Gift BOX-uri</h1>
                <p className="text-muted-foreground">Descoperă colecția noastră de cadouri unice</p>
              </div>
              {activeTag && (
                <Badge 
                  variant="outline" 
                  className="gap-2 px-4 py-2 text-base cursor-pointer hover:bg-secondary/50 transition-colors w-fit"
                  onClick={clearFilter}
                >
                  {activeTag}
                  <X className="w-4 h-4" />
                </Badge>
              )}
            </motion.div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-72 shrink-0 space-y-8">
              {Object.entries(filterCategories).map(([key, category]) => (
                <div key={key}>
                  <h3 className="font-semibold mb-4 text-lg">{category.title}</h3>
                  <div className="space-y-1">
                    {category.filters.map(filter => {
                      const count = getFilterCount(filter.tag);
                      const isActive = activeTag === filter.tag;
                      return (
                        <button
                          key={filter.tag}
                          onClick={() => isActive ? clearFilter() : setFilter(filter.tag)}
                          disabled={count === 0}
                          className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all ${
                            isActive 
                              ? 'bg-primary text-primary-foreground' 
                              : count === 0 
                                ? 'text-muted-foreground/50 cursor-not-allowed' 
                                : 'hover:bg-secondary/50'
                          }`}
                        >
                          <span>{filter.label}</span>
                          <span className={`text-sm ${isActive ? 'opacity-80' : 'opacity-50'}`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              <p className="text-muted-foreground mb-6">
                {isLoading ? 'Se încarcă...' : `${filteredProducts.length} produse găsite`}
              </p>

              {error && (
                <div className="text-center py-20">
                  <p className="text-destructive mb-4">Eroare la încărcarea produselor</p>
                  <Button variant="outline" onClick={() => window.location.reload()}>
                    Încearcă din nou
                  </Button>
                </div>
              )}

              {isLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="overflow-hidden bg-secondary/20 border-border/30">
                      <Skeleton className="aspect-square" />
                      <CardContent className="p-4 space-y-3">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <div className="flex justify-between items-center pt-2">
                          <Skeleton className="h-6 w-24" />
                          <Skeleton className="h-9 w-28" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {!isLoading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => {
                    const badge = getProductBadge(product.node.tags);
                    const imageUrl = product.node.images.edges[0]?.node.url;
                    const price = product.node.priceRange.minVariantPrice.amount;
                    const isAvailable = product.node.variants.edges.some(v => v.node.availableForSale);

                    return (
                      <motion.div
                        key={product.node.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card 
                          className="group overflow-hidden bg-secondary/20 border-border/30 hover:border-primary/30 transition-all cursor-pointer"
                          onClick={() => navigate(`/product/${product.node.handle}`)}
                        >
                          <div className="aspect-square relative overflow-hidden">
                            {imageUrl ? (
                              <img 
                                src={imageUrl} 
                                alt={product.node.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            ) : (
                              <div className="w-full h-full bg-secondary/50 flex items-center justify-center">
                                <Gift className="w-12 h-12 text-muted-foreground" />
                              </div>
                            )}
                            
                            {!isAvailable && (
                              <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                                <span className="text-muted-foreground font-medium">Indisponibil</span>
                              </div>
                            )}

                            {badge && (
                              <Badge 
                                className={`absolute top-3 right-3 gap-1 ${badge.className}`}
                              >
                                {badge.icon}
                                {badge.tag}
                              </Badge>
                            )}
                          </div>
                          
                          <CardContent className="p-4">
                            <div className="flex flex-wrap gap-1 mb-2">
                              {product.node.tags.slice(0, 3).map(tag => (
                                <Badge 
                                  key={tag} 
                                  variant="outline" 
                                  className="text-xs"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setFilter(tag);
                                  }}
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            
                            <h3 className="font-semibold mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                              {product.node.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {product.node.description}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-xl font-bold text-primary">
                                {formatPrice(price)} RON
                              </span>
                              <Button 
                                size="sm" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddToCart(product);
                                }}
                                disabled={!isAvailable}
                              >
                                <ShoppingBag className="w-4 h-4 mr-1" />
                                Adaugă
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {!isLoading && !error && filteredProducts.length === 0 && (
                <div className="text-center py-20">
                  <Gift className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg mb-4">Nu am găsit produse pentru această categorie</p>
                  <Button variant="outline" onClick={clearFilter}>
                    Vezi toate produsele
                  </Button>
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
