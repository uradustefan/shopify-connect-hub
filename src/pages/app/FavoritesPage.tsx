import { useState } from 'react';
import { Heart, Calendar, Plus, Gift } from 'lucide-react';
import { PageTransition } from '@/components/PageTransition';

type TabType = 'produse' | 'calendar';

export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState<TabType>('produse');

  const favoriteProducts = [
    { id: 1, name: 'Cană Ceramică Premium', price: '89 RON', category: 'Acasă' },
    { id: 2, name: 'Set Lumânări Parfumate', price: '159 RON', category: 'Wellness' },
    { id: 3, name: 'Jurnal Piele Naturală', price: '129 RON', category: 'Papetărie' },
    { id: 4, name: 'Șal Cashmere', price: '299 RON', category: 'Fashion' }
  ];

  const birthdays = [
    {
      id: 1,
      name: 'Ana Maria',
      date: '15 Decembrie',
      daysLeft: 3,
      avatar: '👩',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      id: 2,
      name: 'Ion Popescu',
      date: '28 Decembrie',
      daysLeft: 16,
      avatar: '👨',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      name: 'Maria Ionescu',
      date: '12 Ianuarie',
      daysLeft: 31,
      avatar: '👩',
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Header */}
        <div className="px-6 py-4">
          <h1 className="text-2xl font-semibold mb-4">Favorite</h1>
        </div>

        {/* Tabs */}
        <div className="px-6 mb-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('produse')}
              className={`flex-1 py-3 rounded-full transition-all flex items-center justify-center gap-2 ${
                activeTab === 'produse'
                  ? 'bg-[hsl(32,100%,50%)] text-background'
                  : 'bg-card text-foreground border border-border'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Produse Salvate</span>
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex-1 py-3 rounded-full transition-all flex items-center justify-center gap-2 ${
                activeTab === 'calendar'
                  ? 'bg-[hsl(32,100%,50%)] text-background'
                  : 'bg-card text-foreground border border-border'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Calendar</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6">
          {activeTab === 'produse' && (
            <div>
              {favoriteProducts.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {favoriteProducts.map((product) => (
                    <div key={product.id} className="bg-card rounded-2xl overflow-hidden border border-border">
                      <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 relative">
                        <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-[hsl(32,100%,50%)] flex items-center justify-center">
                          <Heart className="w-4 h-4 text-background fill-background" />
                        </button>
                      </div>
                      <div className="p-3">
                        <span className="text-xs text-muted-foreground">{product.category}</span>
                        <h3 className="font-medium text-sm mb-2">{product.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-[hsl(32,100%,50%)] font-semibold">{product.price}</span>
                          <button className="text-xs text-[hsl(32,100%,50%)]">Vezi</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Niciun produs salvat</h3>
                  <p className="text-muted-foreground">
                    Explorează magazinul și salvează produsele tale favorite
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'calendar' && (
            <div>
              <div className="space-y-3 mb-6">
                {birthdays.map((person) => (
                  <div
                    key={person.id}
                    className="bg-card rounded-2xl p-4 border border-border"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${person.gradient} flex items-center justify-center text-2xl`}>
                        {person.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{person.name}</h3>
                        <p className="text-sm text-muted-foreground">{person.date}</p>
                        <p className="text-xs text-[hsl(32,100%,50%)] font-medium mt-1">
                          {person.daysLeft === 3 ? 'În 3 zile! 🎂' : `în ${person.daysLeft} zile`}
                        </p>
                      </div>
                      <button className="px-4 py-2 bg-[hsl(32,100%,50%)] text-background rounded-full text-sm font-medium hover:scale-105 transition-transform flex items-center gap-2">
                        <Gift className="w-4 h-4" />
                        Creează
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Person Button */}
              <button className="w-full bg-card border-2 border-dashed border-border rounded-2xl p-6 hover:border-primary transition-colors flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plus className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Adaugă Persoană</h3>
                  <p className="text-sm text-muted-foreground">Nu uita de zilele importante</p>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
