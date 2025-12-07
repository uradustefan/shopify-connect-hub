import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Search, Filter, Gift, User, Star, TrendingUp, ArrowRight, Sparkles, Crown } from 'lucide-react';

interface FeedBox {
  id: string;
  name: string;
  box_type: string;
  total_value: number;
  orders_count: number;
  image_url: string | null;
  created_at: string;
  creator: {
    id: string;
    username: string;
    full_name: string;
    avatar_url: string | null;
    rating: number;
  } | null;
}

const BOX_TYPE_COLORS: Record<string, string> = {
  elegant: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  luxury: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  royal: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  legend: 'bg-rose-500/20 text-rose-400 border-rose-500/30'
};

const CATEGORIES = [
  { id: 'all', label: 'Toate', icon: Sparkles },
  { id: 'trending', label: 'Trending', icon: TrendingUp },
  { id: 'elegant', label: 'Elegant', icon: Gift },
  { id: 'luxury', label: 'Luxury', icon: Star },
  { id: 'royal', label: 'Royal', icon: Crown }
];

const Feed = () => {
  const navigate = useNavigate();
  const [boxes, setBoxes] = useState<FeedBox[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'value'>('recent');

  useEffect(() => {
    fetchBoxes();
  }, []);

  const fetchBoxes = async () => {
    setLoading(true);
    try {
      const { data: boxesData, error: boxesError } = await supabase
        .from('gift_boxes')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (boxesError) throw boxesError;

      // Fetch creator profiles for each box
      const creatorIds = [...new Set(boxesData?.map(b => b.creator_id) || [])];
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id, username, full_name, avatar_url, rating')
        .in('id', creatorIds);

      const profilesMap = new Map(profilesData?.map(p => [p.id, p]) || []);

      const enrichedBoxes: FeedBox[] = (boxesData || []).map(box => ({
        ...box,
        total_value: box.total_value || 0,
        orders_count: box.orders_count || 0,
        creator: profilesMap.get(box.creator_id) || null
      }));

      setBoxes(enrichedBoxes);
    } catch (error) {
      console.error('Error fetching boxes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBoxes = boxes
    .filter(box => {
      const matchesSearch = box.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        box.creator?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        box.creator?.username?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeCategory === 'all' || 
        activeCategory === 'trending' ||
        box.box_type.toLowerCase() === activeCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (activeCategory === 'trending' || sortBy === 'popular') {
        return (b.orders_count || 0) - (a.orders_count || 0);
      }
      if (sortBy === 'value') {
        return (b.total_value || 0) - (a.total_value || 0);
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Sparkles className="w-3 h-3 mr-1" />
              Feed Comunitate
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display mb-4">
              Descoperă Gift Box-uri
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explorează creațiile comunității noastre de creatori și găsește cadoul perfect
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="px-6 pb-8 sticky top-20 z-30 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-7xl mx-auto">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Caută box-uri sau creatori..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-secondary/50 border-border/50"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <Button
                  key={cat.id}
                  variant={activeCategory === cat.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex-shrink-0 gap-2 ${
                    activeCategory === cat.id 
                      ? '' 
                      : 'bg-secondary/30 border-border/50 hover:bg-secondary/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </Button>
              );
            })}
          </div>

          {/* Sort Options */}
          <div className="flex gap-2 mt-4">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Sortează:
            </span>
            {[
              { id: 'recent', label: 'Recente' },
              { id: 'popular', label: 'Populare' },
              { id: 'value', label: 'Valoare' }
            ].map((sort) => (
              <button
                key={sort.id}
                onClick={() => setSortBy(sort.id as typeof sortBy)}
                className={`text-sm px-3 py-1 rounded-full transition-colors ${
                  sortBy === sort.id 
                    ? 'bg-primary/20 text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {sort.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Feed Grid */}
      <section className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="bg-card border-border/50 overflow-hidden">
                  <Skeleton className="aspect-[4/3] w-full" />
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-10 h-10 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredBoxes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Gift className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-medium mb-2">Niciun box găsit</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery 
                  ? 'Încearcă alte cuvinte cheie'
                  : 'Fii primul care creează un box în această categorie!'}
              </p>
              <Button onClick={() => navigate('/create-box')}>
                Creează un Box
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBoxes.map((box, index) => (
                <motion.div
                  key={box.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card 
                    className="group bg-card border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-300 cursor-pointer"
                    onClick={() => navigate(`/box/${box.id}`)}
                  >
                    {/* Box Image */}
                    <div className="aspect-[4/3] relative overflow-hidden bg-secondary/50">
                      {box.image_url ? (
                        <img 
                          src={box.image_url} 
                          alt={box.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Gift className="w-16 h-16 text-muted-foreground/30" />
                        </div>
                      )}
                      
                      {/* Badge */}
                      <Badge 
                        className={`absolute top-3 left-3 ${BOX_TYPE_COLORS[box.box_type.toLowerCase()] || 'bg-primary/20 text-primary'}`}
                      >
                        {box.box_type}
                      </Badge>

                      {/* Hall of Fame */}
                      {(box.orders_count || 0) > 30 && (
                        <Badge className="absolute top-3 right-3 bg-amber-500/90 text-amber-950">
                          🏆 Hall of Fame
                        </Badge>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                        {box.name}
                      </h3>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xl font-bold text-primary">
                          {box.total_value?.toFixed(0)} RON
                        </span>
                        {(box.orders_count || 0) > 0 && (
                          <span className="text-sm text-muted-foreground">
                            {box.orders_count} vânzări
                          </span>
                        )}
                      </div>

                      {/* Creator */}
                      {box.creator && (
                        <div 
                          className="flex items-center gap-3 pt-3 border-t border-border/50"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/creator/${box.creator?.username}`);
                          }}
                        >
                          <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden flex-shrink-0">
                            {box.creator.avatar_url ? (
                              <img 
                                src={box.creator.avatar_url} 
                                alt={box.creator.full_name || ''} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <User className="w-5 h-5 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {box.creator.full_name || box.creator.username}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span>{Number(box.creator.rating || 0).toFixed(1)}</span>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Load More */}
          {filteredBoxes.length > 0 && filteredBoxes.length >= 12 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="gap-2">
                Încarcă mai multe
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Feed;
