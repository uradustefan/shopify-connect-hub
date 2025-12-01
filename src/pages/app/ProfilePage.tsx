import { Award, Gift, Users, Share2, Settings, LogOut, Crown, Zap } from 'lucide-react';
import { PageTransition } from '@/components/PageTransition';

export default function ProfilePage() {
  const stats = [
    { icon: Award, label: 'Puncte', value: '2,450', color: 'text-[hsl(32,100%,50%)]' },
    { icon: Gift, label: 'Gift-uri', value: '12', color: 'text-purple-500' },
    { icon: Users, label: 'Conexiuni', value: '8', color: 'text-blue-500' },
    { icon: Share2, label: 'Share-uri', value: '45', color: 'text-green-500' }
  ];

  const achievements = [
    { id: 1, name: 'Prima Creație', icon: '🎨', unlocked: true },
    { id: 2, name: 'Social Butterfly', icon: '🦋', unlocked: true },
    { id: 3, name: 'Gift Master', icon: '🎁', unlocked: true },
    { id: 4, name: 'Top Creator', icon: '👑', unlocked: false },
    { id: 5, name: 'Trending Star', icon: '⭐', unlocked: false },
    { id: 6, name: 'Community Hero', icon: '🏆', unlocked: false }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen pb-8">
        {/* Header with Profile */}
        <div className="px-6 py-6 bg-gradient-to-br from-[hsl(32,100%,50%)] to-[hsl(32,100%,40%)] text-background">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-24 h-24 rounded-full bg-background/20 backdrop-blur-sm border-4 border-background/30 flex items-center justify-center text-4xl mb-4">
              👤
            </div>
            <h1 className="text-2xl font-bold mb-1">Alexandru Pop</h1>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4" />
              <span className="font-semibold">Gift Master Lv.5</span>
            </div>
            <div className="flex gap-2">
              <div className="px-3 py-1 bg-background/20 backdrop-blur-sm rounded-full text-xs">
                🎨 Creator
              </div>
              <div className="px-3 py-1 bg-background/20 backdrop-blur-sm rounded-full text-xs">
                ⭐ Trending
              </div>
            </div>
          </div>

          {/* Level Progress */}
          <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progres către Lv.6</span>
              <span className="text-sm font-semibold">2,450 / 3,000 pts</span>
            </div>
            <div className="h-2 bg-background/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-background rounded-full"
                style={{ width: '81%' }}
              />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="px-6 -mt-6 mb-6">
          <div className="grid grid-cols-4 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-card rounded-2xl p-4 border border-border flex flex-col items-center"
              >
                <stat.icon className={`w-6 h-6 mb-2 ${stat.color}`} />
                <span className="text-2xl font-bold mb-1">{stat.value}</span>
                <span className="text-xs text-muted-foreground text-center">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="px-6 mb-6">
          <h2 className="text-lg font-semibold mb-3">Realizări</h2>
          <div className="grid grid-cols-3 gap-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`bg-card rounded-2xl p-4 border ${
                  achievement.unlocked
                    ? 'border-[hsl(32,100%,50%)]'
                    : 'border-border opacity-50'
                }`}
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <p className="text-xs font-medium text-center">{achievement.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription */}
        <div className="px-6 mb-6">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Crown className="w-6 h-6" />
              <h2 className="text-xl font-bold">Abonament Premium</h2>
            </div>
            <p className="text-sm opacity-90 mb-4">
              Acces nelimitat la toate funcțiile AI și creează gift-uri premium
            </p>
            <div className="flex gap-3">
              <button className="flex-1 bg-white text-purple-600 py-3 rounded-full font-semibold hover:scale-105 transition-transform">
                Upgrade acum
              </button>
              <button className="px-6 bg-white/20 backdrop-blur-sm py-3 rounded-full font-semibold hover:scale-105 transition-transform">
                Detalii
              </button>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="px-6 space-y-2">
          <button className="w-full bg-card rounded-2xl p-4 border border-border hover:border-primary transition-colors flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Gift className="w-5 h-5 text-primary" />
            </div>
            <span className="flex-1 text-left font-medium">Gift-urile Mele</span>
            <span className="text-muted-foreground">→</span>
          </button>

          <button className="w-full bg-card rounded-2xl p-4 border border-border hover:border-primary transition-colors flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <span className="flex-1 text-left font-medium">Conexiuni</span>
            <span className="text-muted-foreground">→</span>
          </button>

          <button className="w-full bg-card rounded-2xl p-4 border border-border hover:border-primary transition-colors flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <span className="flex-1 text-left font-medium">Setări</span>
            <span className="text-muted-foreground">→</span>
          </button>

          <button className="w-full bg-card rounded-2xl p-4 border border-border hover:border-destructive transition-colors flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <LogOut className="w-5 h-5 text-destructive" />
            </div>
            <span className="flex-1 text-left font-medium text-destructive">Deconectare</span>
          </button>
        </div>
      </div>
    </PageTransition>
  );
}
