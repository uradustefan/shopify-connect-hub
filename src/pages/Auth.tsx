import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Mail, Lock, User, ArrowLeft, Gift } from 'lucide-react';
import { z } from 'zod';

const emailSchema = z.string().email('Email invalid');
const passwordSchema = z.string().min(6, 'Parola trebuie să aibă minim 6 caractere');

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    try {
      emailSchema.parse(email);
    } catch (e) {
      if (e instanceof z.ZodError) {
        newErrors.email = e.errors[0].message;
      }
    }
    
    try {
      passwordSchema.parse(password);
    } catch (e) {
      if (e instanceof z.ZodError) {
        newErrors.password = e.errors[0].message;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast({
              title: 'Eroare la autentificare',
              description: 'Email sau parolă incorectă',
              variant: 'destructive'
            });
          } else {
            toast({
              title: 'Eroare',
              description: error.message,
              variant: 'destructive'
            });
          }
        } else {
          toast({
            title: 'Bine ai venit!',
            description: 'Te-ai autentificat cu succes'
          });
        }
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          if (error.message.includes('already registered')) {
            toast({
              title: 'Cont existent',
              description: 'Acest email este deja înregistrat. Încearcă să te autentifici.',
              variant: 'destructive'
            });
          } else {
            toast({
              title: 'Eroare',
              description: error.message,
              variant: 'destructive'
            });
          }
        } else {
          toast({
            title: 'Cont creat cu succes!',
            description: 'Bine ai venit în comunitatea Givaora!'
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full mx-auto"
        >
          {/* Back button */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Înapoi acasă
          </button>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <Gift className="w-8 h-8 text-primary" />
            <span className="text-2xl font-display">Givaora</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-display mb-2">
            {isLogin ? 'Bine ai revenit!' : 'Creează-ți contul'}
          </h1>
          <p className="text-muted-foreground mb-8">
            {isLogin
              ? 'Autentifică-te pentru a continua'
              : 'Alătură-te comunității de creatori'}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Nume complet</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ion Popescu"
                    className="pl-10 h-12 bg-secondary/50 border-border/50"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors(prev => ({ ...prev, email: undefined }));
                  }}
                  placeholder="email@exemplu.com"
                  className={`pl-10 h-12 bg-secondary/50 border-border/50 ${errors.email ? 'border-destructive' : ''}`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Parolă</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors(prev => ({ ...prev, password: undefined }));
                  }}
                  placeholder="••••••••"
                  className={`pl-10 h-12 bg-secondary/50 border-border/50 ${errors.password ? 'border-destructive' : ''}`}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-14 text-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full" />
              ) : isLogin ? (
                'Autentifică-te'
              ) : (
                'Creează cont'
              )}
            </Button>
          </form>

          {/* Toggle */}
          <p className="text-center mt-8 text-muted-foreground">
            {isLogin ? 'Nu ai cont?' : 'Ai deja cont?'}{' '}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
              }}
              className="text-primary hover:underline font-medium"
            >
              {isLogin ? 'Înregistrează-te' : 'Autentifică-te'}
            </button>
          </p>
        </motion.div>
      </div>

      {/* Right side - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/20 via-background to-secondary/30 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary)/0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--secondary)/0.2),transparent_50%)]" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center relative z-10 px-12"
        >
          <div className="text-8xl mb-8">🎁</div>
          <h2 className="text-4xl font-display mb-4">Creează magie</h2>
          <p className="text-xl text-muted-foreground max-w-md">
            Transformă fiecare cadou într-o experiență memorabilă cu Givaora
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
