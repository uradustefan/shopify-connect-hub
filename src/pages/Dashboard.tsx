import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { 
  Package, 
  Trophy, 
  TrendingUp, 
  DollarSign, 
  Settings, 
  Plus,
  Eye,
  Edit,
  Trash2,
  Crown,
  Star
} from "lucide-react";
import { toast } from "sonner";

interface GiftBox {
  id: string;
  name: string;
  box_type: string;
  image_url: string | null;
  is_published: boolean;
  orders_count: number;
  total_value: number;
  created_at: string;
}

interface Order {
  id: string;
  total_amount: number;
  commission_amount: number;
  status: string;
  created_at: string;
}

const Dashboard = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [giftBoxes, setGiftBoxes] = useState<GiftBox[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    full_name: "",
    bio: "",
    username: ""
  });

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    
    fetchData();
    
    if (profile) {
      setProfileForm({
        full_name: profile.fullName || "",
        bio: profile.bio || "",
        username: profile.username || ""
      });
    }
  }, [user, profile, navigate]);

  const fetchData = async () => {
    if (!user) return;
    
    try {
      const [boxesResponse, ordersResponse] = await Promise.all([
        supabase
          .from("gift_boxes")
          .select("*")
          .eq("creator_id", user.id)
          .order("created_at", { ascending: false }),
        supabase
          .from("orders")
          .select("*")
          .eq("creator_id", user.id)
          .order("created_at", { ascending: false })
      ]);

      if (boxesResponse.data) setGiftBoxes(boxesResponse.data);
      if (ordersResponse.data) setOrders(ordersResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) return;
    
    const { error } = await supabase
      .from("profiles")
      .update(profileForm)
      .eq("id", user.id);

    if (error) {
      toast.error("Eroare la actualizarea profilului");
    } else {
      toast.success("Profil actualizat!");
      setEditingProfile(false);
    }
  };

  const handleDeleteBox = async (boxId: string) => {
    const { error } = await supabase
      .from("gift_boxes")
      .delete()
      .eq("id", boxId);

    if (error) {
      toast.error("Eroare la ștergerea cutiei");
    } else {
      toast.success("Cutie ștearsă!");
      setGiftBoxes(prev => prev.filter(b => b.id !== boxId));
    }
  };

  const totalCommissions = orders.reduce((sum, o) => sum + (o.commission_amount || 0), 0);
  const totalSales = orders.length;
  const planLimits = {
    basic: { boxes: 5, used: giftBoxes.length },
    legend: { boxes: 15, used: giftBoxes.length },
    royal: { boxes: 999, used: giftBoxes.length }
  };
  const currentPlan = profile?.plan || "basic";
  const planLimit = planLimits[currentPlan as keyof typeof planLimits] || planLimits.basic;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary">
                <AvatarImage src={profile?.avatarUrl || ""} />
                <AvatarFallback className="bg-secondary text-foreground text-xl">
                  {profile?.fullName?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Bună, {profile?.fullName || "Creator"}!
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="capitalize">
                    <Crown className="w-3 h-3 mr-1" />
                    {currentPlan}
                  </Badge>
                  {profile?.rating && profile.rating > 4.5 && (
                    <Badge className="bg-primary text-primary-foreground">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Top Creator
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <Button onClick={() => navigate("/create-box")}>
              <Plus className="w-4 h-4 mr-2" />
              Creează Box
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Box-uri Create</p>
                  <p className="text-2xl font-bold text-foreground">{giftBoxes.length}</p>
                </div>
                <Package className="w-8 h-8 text-primary" />
              </div>
              <Progress 
                value={(planLimit.used / planLimit.boxes) * 100} 
                className="mt-4 h-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {planLimit.used}/{planLimit.boxes} box-uri folosite
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Vânzări Totale</p>
                  <p className="text-2xl font-bold text-foreground">{totalSales}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Comisioane</p>
                  <p className="text-2xl font-bold text-foreground">{totalCommissions} RON</p>
                </div>
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Urmăritori</p>
                  <p className="text-2xl font-bold text-foreground">{profile?.followersCount || 0}</p>
                </div>
                <Trophy className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="boxes" className="space-y-6">
          <TabsList className="bg-secondary">
            <TabsTrigger value="boxes">Box-urile Mele</TabsTrigger>
            <TabsTrigger value="commissions">Comisioane</TabsTrigger>
            <TabsTrigger value="settings">Setări</TabsTrigger>
          </TabsList>

          <TabsContent value="boxes">
            {giftBoxes.length === 0 ? (
              <Card className="bg-card border-border">
                <CardContent className="pt-6 text-center py-12">
                  <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Nu ai creat încă nicio cutie
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Creează prima ta cutie cadou și începe să câștigi!
                  </p>
                  <Button onClick={() => navigate("/create-box")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Creează Prima Cutie
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {giftBoxes.map((box) => (
                  <motion.div
                    key={box.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <Card className="bg-card border-border overflow-hidden group">
                      <div className="aspect-square relative bg-secondary">
                        {box.image_url ? (
                          <img 
                            src={box.image_url} 
                            alt={box.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-16 h-16 text-muted-foreground" />
                          </div>
                        )}
                        
                        {/* Hall of Fame Badge */}
                        {(box.orders_count || 0) >= 30 && (
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-yellow-500 text-black">
                              <Trophy className="w-3 h-3 mr-1" />
                              Hall of Fame
                            </Badge>
                          </div>
                        )}

                        {/* Overlay Actions */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button size="sm" variant="secondary">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="secondary">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDeleteBox(box.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-foreground truncate">
                            {box.name}
                          </h3>
                          <Badge variant="outline" className="capitalize">
                            {box.box_type}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{box.total_value} RON</span>
                          <span>{box.orders_count || 0} comenzi</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="commissions">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Istoric Comisioane</CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Nu ai încă comisioane. Creează box-uri atractive!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div 
                        key={order.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-secondary"
                      >
                        <div>
                          <p className="font-medium text-foreground">
                            Comandă #{order.id.slice(0, 8)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.created_at || "").toLocaleDateString("ro-RO")}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary">
                            +{order.commission_amount} RON
                          </p>
                          <Badge variant="outline" className="capitalize">
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Setări Profil
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Nume Complet</label>
                  <Input
                    value={profileForm.full_name}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, full_name: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Username</label>
                  <Input
                    value={profileForm.username}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, username: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Bio</label>
                  <Textarea
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, bio: e.target.value }))}
                    className="mt-1"
                    rows={4}
                  />
                </div>
                <Button onClick={handleUpdateProfile}>
                  Salvează Modificările
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
