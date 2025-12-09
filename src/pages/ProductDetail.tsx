import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { fetchProductByHandle, fetchProducts } from '@/lib/shopify';
import { ShopifyProduct } from '@/types/shopify';
import { useCartStore } from '@/stores/cartStore';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  ShoppingBag, 
  ArrowLeft, 
  Gift, 
  Check,
  Crown,
  Sparkles,
  Star,
  Minus,
  Plus
} from 'lucide-react';
import { toast } from 'sonner';

// Badge configuration
const tagBadges: Record<string, { icon: React.ReactNode; className: string }> = {
  'premium': { icon: <Crown className="w-3 h-3" />, className: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  'luxury': { icon: <Sparkles className="w-3 h-3" />, className: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  'craciun': { icon: <Star className="w-3 h-3" />, className: 'bg-red-500/20 text-red-400 border-red-500/30' },
};

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const addItem = useCartStore(state => state.addItem);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Fetch product by handle
  const { data, isLoading, error } = useQuery({
    queryKey: ['shopify-product', handle],
    queryFn: () => fetchProductByHandle(handle!),
    enabled: !!handle,
  });

  // Fetch related products
  const { data: relatedData } = useQuery({
    queryKey: ['shopify-products-related'],
    queryFn: () => fetchProducts(8),
    staleTime: 1000 * 60 * 5,
  });

  const product = data?.data?.productByHandle;
  const allProducts: ShopifyProduct[] = relatedData?.data?.products?.edges || [];
  
  // Get related products (same tags, exclude current)
  const relatedProducts = allProducts
    .filter(p => p.node.handle !== handle)
    .filter(p => 
      product?.tags?.some((tag: string) => 
        p.node.tags.includes(tag)
      )
    )
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!product) return;

    const variant = product.variants.edges[0]?.node;
    if (!variant) {
      toast.error('Produsul nu este disponibil');
      return;
    }

    // Build ShopifyProduct structure
    const shopifyProduct: ShopifyProduct = {
      node: product
    };

    addItem({
      product: shopifyProduct,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity,
      selectedOptions: variant.selectedOptions || []
    });

    toast.success('Adăugat în coș', {
      description: `${quantity}x ${product.title}`,
    });
  };

  const formatPrice = (amount: string) => {
    return Math.round(parseFloat(amount)).toLocaleString('ro-RO');
  };

  const getProductBadge = (tags: string[]) => {
    for (const tag of tags) {
      const badge = tagBadges[tag.toLowerCase()];
      if (badge) return { tag, ...badge };
    }
    return null;
  };

  // Parse HTML description to extract content items
  const parseDescription = (html: string) => {
    if (!html) return { text: '', items: [] };
    
    // Simple parsing - look for list items
    const items: string[] = [];
    const listMatch = html.match(/<li[^>]*>(.*?)<\/li>/gi);
    if (listMatch) {
      listMatch.forEach(item => {
        const text = item.replace(/<[^>]+>/g, '').trim();
        if (text) items.push(text);
      });
    }

    // Get plain text
    const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    
    return { text, items };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Skeleton className="aspect-square rounded-2xl" />
              <div className="space-y-6">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-12 w-40" />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-6 text-center">
            <Gift className="w-20 h-20 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-2xl font-semibold mb-4">Produsul nu a fost găsit</h1>
            <Button onClick={() => navigate('/products')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Înapoi la produse
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const images = product.images?.edges || [];
  const currentImage = images[selectedImageIndex]?.node;
  const price = product.priceRange.minVariantPrice.amount;
  const isAvailable = product.variants.edges.some((v: any) => v.node.availableForSale);
  const badge = getProductBadge(product.tags || []);
  const { text: descriptionText, items: contentItems } = parseDescription(product.descriptionHtml || product.description);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Back button */}
          <button 
            onClick={() => navigate('/products')} 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Înapoi la produse
          </button>

          {/* Product section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="aspect-square relative overflow-hidden rounded-2xl bg-secondary/20">
                {currentImage ? (
                  <img 
                    src={currentImage.url} 
                    alt={currentImage.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Gift className="w-20 h-20 text-muted-foreground" />
                  </div>
                )}

                {badge && (
                  <Badge 
                    className={`absolute top-4 right-4 gap-1 text-sm px-3 py-1 ${badge.className}`}
                  >
                    {badge.icon}
                    {badge.tag}
                  </Badge>
                )}
              </div>

              {/* Thumbnail gallery */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                        index === selectedImageIndex 
                          ? 'border-primary' 
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={img.node.url} 
                        alt={img.node.altText || `${product.title} - ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {(product.tags || []).map((tag: string) => (
                  <Badge 
                    key={tag} 
                    variant="outline"
                    className="cursor-pointer hover:bg-secondary/50"
                    onClick={() => navigate(`/products?tag=${tag}`)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Title & Price */}
              <div>
                <h1 className="text-3xl md:text-4xl font-display mb-4">{product.title}</h1>
                <div className="text-3xl font-bold text-primary">
                  {formatPrice(price)} RON
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-lg leading-relaxed">
                {product.description || descriptionText}
              </p>

              {/* Content items if available */}
              {contentItems.length > 0 && (
                <div className="bg-secondary/20 rounded-xl p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Gift className="w-5 h-5 text-primary" />
                    Conținutul Gift BOX-ului
                  </h3>
                  <ul className="space-y-2">
                    {contentItems.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quantity & Add to cart */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div className="flex items-center border border-border rounded-lg">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-secondary/50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-3 font-medium min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-secondary/50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <Button 
                  size="lg" 
                  className="flex-1 text-lg py-6"
                  onClick={handleAddToCart}
                  disabled={!isAvailable}
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  {isAvailable ? 'Adaugă în coș' : 'Indisponibil'}
                </Button>
              </div>

              {/* Availability notice */}
              {isAvailable && (
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  În stoc și gata de expediere
                </p>
              )}
            </motion.div>
          </div>

          {/* Related products */}
          {relatedProducts.length > 0 && (
            <section>
              <h2 className="text-2xl font-display mb-8">Produse similare</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relProduct) => {
                  const relImage = relProduct.node.images.edges[0]?.node.url;
                  const relPrice = relProduct.node.priceRange.minVariantPrice.amount;
                  
                  return (
                    <Card 
                      key={relProduct.node.id}
                      className="group overflow-hidden bg-secondary/20 border-border/30 hover:border-primary/30 transition-all cursor-pointer"
                      onClick={() => navigate(`/product/${relProduct.node.handle}`)}
                    >
                      <div className="aspect-square relative overflow-hidden">
                        {relImage ? (
                          <img 
                            src={relImage} 
                            alt={relProduct.node.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-secondary/50 flex items-center justify-center">
                            <Gift className="w-8 h-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                          {relProduct.node.title}
                        </h3>
                        <p className="text-primary font-bold mt-1">
                          {formatPrice(relPrice)} RON
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
