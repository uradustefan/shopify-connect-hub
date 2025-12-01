import { Heart, MessageCircle, Share2, Sparkles, Gift } from 'lucide-react';
import { PageTransition } from '@/components/PageTransition';

export default function HomePage() {
  const stories = [
    { id: 1, name: 'Pentru Mama', avatar: '👩', gradient: 'from-pink-500 to-rose-500' },
    { id: 2, name: 'Aniversări', avatar: '🎂', gradient: 'from-purple-500 to-pink-500' },
    { id: 3, name: 'Valentine\'s', avatar: '💝', gradient: 'from-red-500 to-pink-500' },
    { id: 4, name: 'Colegi', avatar: '💼', gradient: 'from-blue-500 to-cyan-500' },
  ];

  const gifts = [
    {
      id: 1,
      title: 'Set Spa Relaxare',
      creator: 'Ana M.',
      image: 'bg-gradient-to-br from-purple-400 to-pink-400',
      likes: 234,
      description: 'Perfect pentru mama - uleiuri esențiale, lumânări parfumate și prosoape premium'
    },
    {
      id: 2,
      title: 'Kit Aventură în Natură',
      creator: 'Ion P.',
      image: 'bg-gradient-to-br from-green-400 to-emerald-400',
      likes: 189,
      description: 'Pentru iubitorii de outdoor - lanternă, termo, kit camping'
    },
    {
      id: 3,
      title: 'Colecție Gourmet',
      creator: 'Maria S.',
      image: 'bg-gradient-to-br from-orange-400 to-red-400',
      likes: 312,
      description: 'Delicii culinare selectate - cafea premium, ciocolată artizanală, mirodenii'
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Descoperă</h1>
            <p className="text-sm text-muted-foreground">Inspirație pentru cadouri perfecte</p>
          </div>
          <button className="p-2 hover:bg-muted/20 rounded-full transition-colors">
            <Sparkles className="w-5 h-5 text-[hsl(32,100%,50%)]" />
          </button>
        </div>

        {/* Stories */}
        <div className="px-6 py-4">
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {stories.map((story) => (
              <button
                key={story.id}
                className="flex flex-col items-center gap-2 min-w-[80px] group"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${story.gradient} flex items-center justify-center text-2xl border-2 border-background shadow-lg group-hover:scale-105 transition-transform`}>
                  {story.avatar}
                </div>
                <span className="text-xs text-center">{story.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Gift of the Day */}
        <div className="px-6 py-4">
          <div className="bg-gradient-to-br from-[hsl(32,100%,50%)] to-[hsl(32,100%,40%)] rounded-3xl p-6 text-background">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-semibold">GIFT OF THE DAY</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Set Wellness Premium</h3>
            <p className="text-sm opacity-90 mb-4">
              Combinație perfectă de relaxare și îngrijire - ideal pentru orice ocazie
            </p>
            <button className="bg-background text-foreground px-6 py-3 rounded-full font-medium hover:scale-105 transition-transform">
              Vezi detalii
            </button>
          </div>
        </div>

        {/* Feed */}
        <div className="px-6 py-4">
          <h2 className="text-lg font-semibold mb-4">Trending Gifts</h2>
          <div className="space-y-6">
            {gifts.map((gift) => (
              <div key={gift.id} className="bg-card rounded-3xl overflow-hidden border border-border">
                {/* Header */}
                <div className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(32,100%,50%)] to-[hsl(32,100%,40%)] flex items-center justify-center text-background font-semibold">
                    {gift.creator[0]}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{gift.creator}</p>
                    <p className="text-xs text-muted-foreground">2 ore în urmă</p>
                  </div>
                </div>

                {/* Image */}
                <div className={`h-64 ${gift.image} flex items-center justify-center`}>
                  <Gift className="w-20 h-20 text-white/50" />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{gift.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{gift.description}</p>

                  {/* Actions */}
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 hover:text-[hsl(32,100%,50%)] transition-colors">
                      <Heart className="w-5 h-5" />
                      <span className="text-sm">{gift.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-[hsl(32,100%,50%)] transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm">24</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-[hsl(32,100%,50%)] transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* CTA */}
                <div className="px-4 pb-4">
                  <button className="w-full bg-[hsl(32,100%,50%)] text-background py-3 rounded-full font-medium hover:scale-[1.02] transition-transform">
                    Creează similar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
