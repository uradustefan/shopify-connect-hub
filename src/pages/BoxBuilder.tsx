import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { useBoxBuilderStore } from "@/stores/boxBuilderStore";
import { boxTypes } from "@/data/boxTypes";
import { mockProducts } from "@/data/mockProducts";
import { supabase } from "@/integrations/supabase/client";
import { 
  ArrowLeft, 
  ArrowRight, 
  Package, 
  Check,
  Plus,
  Minus,
  X,
  AlertTriangle,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";

const BoxBuilder = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  
  const {
    currentStep,
    selectedBoxType,
    selectedProducts,
    boxName,
    totalValue,
    productCount,
    setStep,
    setBoxType,
    setBoxName,
    addProduct,
    removeProduct,
    updateQuantity,
    canAddProduct,
    reset
  } = useBoxBuilderStore();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const handleAddProduct = (product: typeof mockProducts[0]) => {
    const { canAdd, reason } = canAddProduct(product);
    
    if (!canAdd) {
      toast.warning(reason, {
        action: {
          label: "Upgrade",
          onClick: () => navigate("/pricing")
        }
      });
      return;
    }
    
    addProduct(product);
    toast.success(`${product.name} adăugat!`);
  };

  const handleSaveBox = async () => {
    if (!user || !selectedBoxType) return;
    
    if (!boxName.trim()) {
      toast.error("Te rog introdu un nume pentru cutie");
      return;
    }

    if (selectedProducts.length === 0) {
      toast.error("Adaugă cel puțin un produs");
      return;
    }

    setSaving(true);
    
    const { error } = await supabase
      .from("gift_boxes")
      .insert({
        creator_id: user.id,
        name: boxName,
        box_type: selectedBoxType.id,
        products: selectedProducts.map(p => ({
          id: p.product.id,
          name: p.product.name,
          price: p.product.price,
          quantity: p.quantity
        })),
        total_value: totalValue,
        is_published: true
      });

    if (error) {
      toast.error("Eroare la salvarea cutiei");
      console.error(error);
    } else {
      toast.success("Cutie creată cu succes!");
      reset();
      navigate("/dashboard");
    }
    
    setSaving(false);
  };

  const steps = [
    { num: 1, label: "Alege Tipul" },
    { num: 2, label: "Adaugă Produse" },
    { num: 3, label: "Finalizează" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {steps.map((step, index) => (
            <div key={step.num} className="flex items-center">
              <div 
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  currentStep >= step.num 
                    ? "bg-primary border-primary text-primary-foreground" 
                    : "border-muted-foreground text-muted-foreground"
                }`}
              >
                {currentStep > step.num ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.num
                )}
              </div>
              <span className={`ml-2 text-sm ${
                currentStep >= step.num ? "text-foreground" : "text-muted-foreground"
              }`}>
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  currentStep > step.num ? "bg-primary" : "bg-muted"
                }`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Select Box Type */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-center text-foreground mb-8">
                Alege tipul cutiei tale
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {boxTypes.map((type) => (
                  <Card 
                    key={type.id}
                    className={`cursor-pointer transition-all hover:scale-105 ${
                      selectedBoxType?.id === type.id 
                        ? "border-primary ring-2 ring-primary" 
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setBoxType(type)}
                  >
                    <CardContent className="p-6 text-center">
                      <span className="text-4xl mb-4 block">{type.icon}</span>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {type.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {type.description}
                      </p>
                      <div className="space-y-1 text-sm">
                        <Badge variant="outline">
                          Max {type.maxProducts} produse
                        </Badge>
                        <Badge variant="outline" className="ml-2">
                          Max {type.maxValue} RON
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Add Products */}
          {currentStep === 2 && selectedBoxType && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center justify-between mb-6">
                <Button variant="ghost" onClick={() => setStep(1)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Înapoi
                </Button>
                
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    {selectedBoxType.icon} {selectedBoxType.name}
                  </Badge>
                </div>

                <Button 
                  onClick={() => setStep(3)}
                  disabled={selectedProducts.length === 0}
                >
                  Continuă
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Progress Bars */}
              <div className="grid grid-cols-2 gap-4 mb-8 max-w-xl mx-auto">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Produse</span>
                    <span className="text-foreground font-medium">
                      {productCount}/{selectedBoxType.maxProducts}
                    </span>
                  </div>
                  <Progress 
                    value={(productCount / selectedBoxType.maxProducts) * 100}
                    className="h-3"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Valoare</span>
                    <span className="text-foreground font-medium">
                      {totalValue}/{selectedBoxType.maxValue} RON
                    </span>
                  </div>
                  <Progress 
                    value={(totalValue / selectedBoxType.maxValue) * 100}
                    className="h-3"
                  />
                </div>
              </div>

              {/* Warning if near limits */}
              {(productCount >= selectedBoxType.maxProducts * 0.8 || 
                totalValue >= selectedBoxType.maxValue * 0.8) && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6 flex items-center gap-3 max-w-xl mx-auto">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <p className="text-sm text-yellow-500">
                    Te apropii de limitele cutiei {selectedBoxType.name}. 
                    <button 
                      className="underline ml-1"
                      onClick={() => navigate("/pricing")}
                    >
                      Upgrade pentru mai mult
                    </button>
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Products Grid */}
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Produse Disponibile
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {mockProducts.map((product) => {
                      const { canAdd } = canAddProduct(product);
                      const inBox = selectedProducts.find(p => p.product.id === product.id);
                      
                      return (
                        <Card 
                          key={product.id}
                          className={`overflow-hidden ${!canAdd && !inBox ? "opacity-50" : ""}`}
                        >
                          <div className="aspect-square bg-secondary relative">
                            {product.imageUrl ? (
                              <img 
                                src={product.imageUrl} 
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package className="w-8 h-8 text-muted-foreground" />
                              </div>
                            )}
                            
                            {inBox && (
                              <Badge className="absolute top-2 right-2 bg-primary">
                                {inBox.quantity}x
                              </Badge>
                            )}
                          </div>
                          <CardContent className="p-3">
                            <h4 className="font-medium text-foreground text-sm truncate">
                              {product.name}
                            </h4>
                            <p className="text-primary font-semibold text-sm">
                              {product.price} RON
                            </p>
                            <Button 
                              size="sm" 
                              className="w-full mt-2"
                              onClick={() => handleAddProduct(product)}
                              disabled={!canAdd && !inBox}
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              Adaugă
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                {/* Selected Products Sidebar */}
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    În Cutie ({productCount})
                  </h3>
                  
                  {selectedProducts.length === 0 ? (
                    <Card className="bg-card border-dashed">
                      <CardContent className="p-6 text-center">
                        <Package className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                        <p className="text-muted-foreground text-sm">
                          Adaugă produse în cutie
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-3">
                      {selectedProducts.map((item) => (
                        <Card key={item.product.id} className="bg-card">
                          <CardContent className="p-3 flex items-center gap-3">
                            <div className="w-12 h-12 rounded bg-secondary flex-shrink-0 overflow-hidden">
                              {item.product.imageUrl ? (
                                <img 
                                  src={item.product.imageUrl}
                                  alt={item.product.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <Package className="w-6 h-6 m-3 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground text-sm truncate">
                                {item.product.name}
                              </p>
                              <p className="text-primary text-sm">
                                {item.product.price * item.quantity} RON
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button 
                                size="icon" 
                                variant="ghost" 
                                className="h-7 w-7"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-6 text-center text-foreground">
                                {item.quantity}
                              </span>
                              <Button 
                                size="icon" 
                                variant="ghost" 
                                className="h-7 w-7"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                              <Button 
                                size="icon" 
                                variant="ghost" 
                                className="h-7 w-7 text-destructive"
                                onClick={() => removeProduct(item.product.id)}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      
                      <div className="pt-3 border-t border-border">
                        <div className="flex justify-between text-lg font-semibold">
                          <span className="text-foreground">Total</span>
                          <span className="text-primary">{totalValue} RON</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Finalize */}
          {currentStep === 3 && selectedBoxType && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto"
            >
              <Button variant="ghost" onClick={() => setStep(2)} className="mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Înapoi
              </Button>

              <Card className="bg-card border-border">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <Sparkles className="w-16 h-16 mx-auto text-primary mb-4" />
                    <h2 className="text-2xl font-bold text-foreground">
                      Finalizează Cutia
                    </h2>
                    <p className="text-muted-foreground mt-2">
                      Mai rămâne un singur pas!
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        Nume Cutie *
                      </label>
                      <Input
                        value={boxName}
                        onChange={(e) => setBoxName(e.target.value)}
                        placeholder="ex: Cutie Romantică de Crăciun"
                        className="mt-2"
                      />
                    </div>

                    <div className="bg-secondary rounded-lg p-4">
                      <h4 className="font-medium text-foreground mb-3">Sumar</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tip cutie</span>
                          <span className="text-foreground">{selectedBoxType.icon} {selectedBoxType.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Produse</span>
                          <span className="text-foreground">{productCount} produse</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Valoare totală</span>
                          <span className="text-primary font-semibold">{totalValue} RON</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => {
                          reset();
                          navigate("/dashboard");
                        }}
                      >
                        Anulează
                      </Button>
                      <Button 
                        className="flex-1"
                        onClick={handleSaveBox}
                        disabled={saving || !boxName.trim()}
                      >
                        {saving ? "Se salvează..." : "Creează Cutia"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default BoxBuilder;
