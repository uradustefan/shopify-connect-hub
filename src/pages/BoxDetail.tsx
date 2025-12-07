import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { 
  Gift, User, Star, ShoppingCart, ArrowLeft, Package, 
  ChevronLeft, ChevronRight, Heart, Share2, Check, Sparkles 
} from 'lucide-react';
import { SelectedProduct } from '@/types/giftbox';
import { useCartStore } from '@/stores/cartStore';
import { createStorefrontCheckout } from '@/lib/shopify';

interface BoxData {
  id: string;
  name: string;
  box_type: string;
  total_value: number;
  orders_count: number;
  image_url: string | null;
  products: SelectedProduct[];
  is_published: boolean;
  created_at: string;
  creator: {
    id: string;
    username: string;
    full_name: string;
    avatar_url: string | null;
    rating: number;
    boxes_sold: number;
  } | null;
}

const BOX_TYPE_INFO: Record<string, { color: string; icon: string; description: string }> = {
  elegant: { 
    color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    icon: '✨',
    description: 'Până la 5 produse, valoare max 200 RON'
  },
  luxury: { 
    color: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    icon: '💎',
    description: 'Până la 7 produse, valoare max 500 RON'
  },
  royal: { 
    color: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    icon: '👑',
    description: 'Până la 11 produse, valoare max 1000 RON'
  },
  legend: { 
    color: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    icon: '🏆',
    description: 'Până la 15 produse, valoare max 2000 RON'
  }
};

const BoxDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addItem, items } = useCartStore();
  
  const [box, setBox] = useState<BoxData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (id) {
      fetchBoxData();
    }
  }, [id]);

  const fetchBoxData = async () => {
    setLoading(true);
    try {
      const { data: boxData, error: boxError } = await supabase
        .from('gift_boxes')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (boxError) throw boxError;
      if (!boxData) {
        navigate('/feed');
        return;
      }

      // Fetch creator profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('id, username, full_name, avatar_url, rating, boxes_sold')
        .eq('id', boxData.creator_id)
        .maybeSingle();

      // Parse products from JSONB
      const products = Array.isArray(boxData.products) 
        ? boxData.products as unknown as SelectedProduct[]
        : [];

      setBox({
        ...boxData,
        total_value: boxData.total_value || 0,
        orders_count: boxData.orders_count || 0,
        products,
        creator: profileData || null
      });
    } catch (error) {
      console.error('Error fetching box:', error);
      toast({
        title: 'Eroare',
        description: 'Nu am putut încărca detaliile box-ului',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBuyBox = async () => {
    if (!box || box.products.length === 0) {
      toast({
        title: 'Box gol',
        description: 'Acest box nu conține produse',
        variant: 'destructive'
      });
      return;
    }

    setIsCheckingOut(true);
    try {
      // Create cart items from box products
      // Note: In a real implementation, you'd map these to actual Shopify variant IDs
      const cartItems = box.products.map(p => ({
        product: {
          node: {
            id: p.product.id,
            title: p.product.name,
            description: p.product.description,
            handle: p.product.id,
            priceRange: {
              minVariantPrice: {
                amount: String(p.product.price),
                currencyCode: 'RON'
              }
            },
            images: { edges: [{ node: { url: p.product.imageUrl, altText: p.product.name } }] },
            variants: { edges: [] },
            options: []
          }
        },
        variantId: `gid://shopify/ProductVariant/${p.product.id}`,
        variantTitle: 'Default',
        price: { amount: String(p.product.price), currencyCode: 'RON' },
        quantity: p.quantity,
        selectedOptions: []
      }));

      // Add all items to cart
      cartItems.forEach(item => addItem(item));

      toast({
        title: 'Produse adăugate în coș!',
        description: `${box.products.length} produse din "${box.name}" au fost adăugate`,
      });
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: 'Eroare',
        description: 'Nu am putut procesa comanda',
        variant: 'destructive'
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: box?.name,
        text: `Descoperă acest Gift Box incredibil pe Givaora!`,
        url: window.location.href
      });
    } catch {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link copiat!',
        description: 'Link-ul a fost copiat în clipboard'
      });
    }
  };

  // Collect all product images for gallery
  const galleryImages = box?.products.map(p => ({
    url: p.product.imageUrl,
    alt: p.product.name
  })) || [];

  if (box?.image_url) {
    galleryImages.unshift({ url: box.image_url, alt: box.name });
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              <Skeleton className="aspect-square rounded-2xl" />
              <div className="space-y-6">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-14 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!box) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Gift className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
          <h2 className="text-xl font-medium mb-2">Box nu a fost găsit</h2>
          <Button onClick={() => navigate('/feed')}>Înapoi la Feed</Button>
        </div>
      </div>
    );
  }

  const boxTypeInfo = BOX_TYPE_INFO[box.box_type.toLowerCase()] || BOX_TYPE_INFO.elegant;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Înapoi
          </motion.button>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Gallery Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary/50">
                <AnimatePresence mode="wait">
                  {galleryImages.length > 0 ? (
                    <motion.img
                      key={activeImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      src={galleryImages[activeImageIndex]?.url}
                      alt={galleryImages[activeImageIndex]?.alt}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Gift className="w-24 h-24 text-muted-foreground/30" />
                    </div>
                  )}
                </AnimatePresence>

                {/* Navigation Arrows */}
                {galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImageIndex(prev => 
                        prev === 0 ? galleryImages.length - 1 : prev - 1
                      )}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActiveImageIndex(prev => 
                        prev === galleryImages.length - 1 ? 0 : prev + 1
                      )}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className={boxTypeInfo.color}>
                    {boxTypeInfo.icon} {box.box_type}
                  </Badge>
                  {(box.orders_count || 0) > 30 && (
                    <Badge className="bg-amber-500/90 text-amber-950">
                      🏆 Hall of Fame
                    </Badge>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        idx === activeImageIndex 
                          ? 'border-primary' 
                          : 'border-transparent hover:border-border'
                      }`}
                    >
                      <img 
                        src={img.url} 
                        alt={img.alt} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Details Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              {/* Title & Price */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  {boxTypeInfo.description}
                </p>
                <h1 className="text-3xl md:text-4xl font-display mb-4">{box.name}</h1>
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-bold text-primary">
                    {box.total_value?.toFixed(0)} RON
                  </span>
                  {(box.orders_count || 0) > 0 && (
                    <span className="text-muted-foreground">
                      {box.orders_count} vânzări
                    </span>
                  )}
                </div>
              </div>

              {/* Creator Card */}
              {box.creator && (
                <Card 
                  className="p-4 bg-secondary/30 border-border/50 cursor-pointer hover:bg-secondary/50 transition-colors"
                  onClick={() => navigate(`/creator/${box.creator?.username}`)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-secondary overflow-hidden flex-shrink-0">
                      {box.creator.avatar_url ? (
                        <img 
                          src={box.creator.avatar_url} 
                          alt={box.creator.full_name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User className="w-6 h-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">
                        {box.creator.full_name || box.creator.username}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          {Number(box.creator.rating || 0).toFixed(1)}
                        </span>
                        <span>{box.creator.boxes_sold || 0} boxuri vândute</span>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Products List */}
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Produse în acest box ({box.products.length})
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                  {box.products.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border/30"
                    >
                      <div className="w-12 h-12 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                        {item.product.imageUrl ? (
                          <img 
                            src={item.product.imageUrl} 
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Gift className="w-5 h-5 text-muted-foreground/50" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity}x · {item.product.price} RON
                        </p>
                      </div>
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleBuyBox}
                  size="lg"
                  className="flex-1 h-14 text-lg gap-2"
                  disabled={isCheckingOut || box.products.length === 0}
                >
                  {isCheckingOut ? (
                    <div className="animate-spin w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full" />
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Adaugă în coș
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 w-14"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 w-14"
                  onClick={handleShare}
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-border/50">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Curățat de creatori
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Verificat calitativ
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Gift className="w-4 h-4 text-amber-400" />
                  Ambalaj premium
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BoxDetail;
