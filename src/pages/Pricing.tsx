import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { plans } from '@/data/boxTypes';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowLeft, Sparkles, Crown, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const planIcons: Record<string, React.ReactNode> = {
  basic: <Zap className="w-6 h-6" />,
  legend: <Sparkles className="w-6 h-6" />,
  royal: <Crown className="w-6 h-6" />
};

const Pricing = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const currentPlan = profile?.plan || 'basic';

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Înapoi
            </button>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge variant="secondary" className="mb-4">
                Planuri & Prețuri
              </Badge>
              <h1 className="text-4xl md:text-6xl font-display mb-4">
                Alege planul potrivit
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Indiferent de nevoile tale, avem un plan care să te ajute să creezi 
                experiențe memorabile
              </p>
            </motion.div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative ${plan.highlighted ? 'md:-mt-4 md:mb-4' : ''}`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      Cel mai popular
                    </Badge>
                  </div>
                )}
                
                <Card className={`h-full transition-all duration-300 ${
                  plan.highlighted 
                    ? 'border-primary shadow-lg shadow-primary/20 bg-gradient-to-b from-primary/5 to-transparent' 
                    : 'border-border/50 hover:border-primary/30'
                }`}>
                  <CardHeader className="text-center pb-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                      plan.highlighted ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                    }`}>
                      {planIcons[plan.id]}
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground"> RON/lună</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className={`w-5 h-5 shrink-0 mt-0.5 ${
                            plan.highlighted ? 'text-primary' : 'text-green-500'
                          }`} />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      className={`w-full ${plan.highlighted ? '' : 'variant-outline'}`}
                      variant={plan.highlighted ? 'default' : 'outline'}
                      onClick={() => {
                        if (!user) {
                          navigate('/auth');
                        } else if (currentPlan === plan.id) {
                          // Already on this plan
                        } else {
                          // Would trigger upgrade flow
                          navigate('/dashboard');
                        }
                      }}
                    >
                      {!user ? 'Începe acum' : currentPlan === plan.id ? 'Planul curent' : 'Upgrade'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-24 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-display mb-4">Întrebări frecvente</h2>
            <p className="text-muted-foreground mb-8">
              Ai nelămuriri? Scrie-ne la <a href="mailto:support@givaora.com" className="text-primary hover:underline">support@givaora.com</a>
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="p-6 rounded-xl bg-secondary/30">
                <h3 className="font-semibold mb-2">Pot schimba planul oricând?</h3>
                <p className="text-sm text-muted-foreground">
                  Da, poți face upgrade sau downgrade în orice moment din dashboard.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-secondary/30">
                <h3 className="font-semibold mb-2">Ce se întâmplă după trial?</h3>
                <p className="text-sm text-muted-foreground">
                  Contul rămâne activ pe planul Basic cu funcționalități limitate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
