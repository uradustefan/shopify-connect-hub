import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCreatorByUsername } from '@/data/mockCreators';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft, 
  Package, 
  Layers, 
  Play, 
  Star,
  Trophy,
  Share2,
  MoreHorizontal
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const CreatorProfile = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  
  const creator = getCreatorByUsername(username || '');
  const isOwner = profile?.username === creator?.username;

  if (!creator) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-display mb-4">Creator negăsit</p>
          <Button onClick={() => navigate('/')}>Înapoi acasă</Button>
        </div>
      </div>
    );
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Înapoi
          </button>

          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row gap-8 items-start mb-12"
          >
            {/* Avatar */}
            <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-primary/20">
              <AvatarImage src={creator.avatarUrl} alt={creator.username} />
              <AvatarFallback className="text-3xl">{creator.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-display">@{creator.username}</h1>
                  {creator.stats.boxesSold > 50 && (
                    <Badge variant="secondary" className="mt-2 gap-1">
                      <Trophy className="w-3 h-3" />
                      Top Creator
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  {isOwner ? (
                    <Button variant="outline" onClick={() => navigate('/dashboard')}>
                      Editează profilul
                    </Button>
                  ) : (
                    <>
                      <Button>Urmărește</Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{formatNumber(creator.stats.followers)}</p>
                  <p className="text-sm text-muted-foreground">Urmăritori</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{creator.stats.boxesSold}</p>
                  <p className="text-sm text-muted-foreground">Vânzări</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    {creator.stats.rating}
                  </p>
                  <p className="text-sm text-muted-foreground">Rating</p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-muted-foreground">{creator.bio}</p>
            </div>
          </motion.div>

          {/* Tabs */}
          <Tabs defaultValue="boxes" className="w-full">
            <TabsList className="w-full justify-start border-b border-border/50 rounded-none bg-transparent h-auto p-0 mb-8">
              <TabsTrigger 
                value="boxes" 
                className="flex items-center gap-2 px-6 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                <Package className="w-4 h-4" />
                Box-uri
              </TabsTrigger>
              <TabsTrigger 
                value="rituals"
                className="flex items-center gap-2 px-6 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                <Layers className="w-4 h-4" />
                Ritualuri
              </TabsTrigger>
              <TabsTrigger 
                value="moments"
                className="flex items-center gap-2 px-6 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                <Play className="w-4 h-4" />
                Momente
              </TabsTrigger>
            </TabsList>

            {/* Boxes Tab - Grid 1:1 */}
            <TabsContent value="boxes">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {creator.content.boxes.map((box, index) => (
                  <motion.div
                    key={box.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
                  >
                    <img 
                      src={box.imageUrl} 
                      alt={box.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                      <h3 className="font-semibold text-sm">{box.name}</h3>
                      <p className="text-xs text-muted-foreground">{box.totalValue} RON</p>
                    </div>
                    {box.ordersCount > 30 && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-yellow-500/90 text-yellow-950 gap-1">
                          <Trophy className="w-3 h-3" />
                          Hall of Fame
                        </Badge>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              {creator.content.boxes.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  Niciun box publicat încă
                </div>
              )}
            </TabsContent>

            {/* Rituals Tab - Grid 4:5 */}
            <TabsContent value="rituals">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {creator.content.rituals.map((ritual, index) => (
                  <motion.div
                    key={ritual.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative rounded-xl overflow-hidden group cursor-pointer"
                    style={{ aspectRatio: '4/5' }}
                  >
                    <img 
                      src={ritual.imageUrl} 
                      alt={ritual.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent flex flex-col justify-end p-4">
                      <h3 className="font-semibold text-sm">{ritual.title}</h3>
                      <p className="text-xs text-muted-foreground">{ritual.steps} pași</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              {creator.content.rituals.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  Niciun ritual publicat încă
                </div>
              )}
            </TabsContent>

            {/* Moments Tab - Grid 9:16 (Reels style) */}
            <TabsContent value="moments">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {creator.content.moments.map((moment, index) => (
                  <motion.div
                    key={moment.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative rounded-xl overflow-hidden group cursor-pointer"
                    style={{ aspectRatio: '9/16' }}
                  >
                    <img 
                      src={moment.videoThumbnail} 
                      alt={moment.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
                        <Play className="w-5 h-5 fill-foreground" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/90 to-transparent">
                      <p className="text-xs font-medium line-clamp-2">{moment.title}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              {creator.content.moments.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  Niciun moment publicat încă
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreatorProfile;
