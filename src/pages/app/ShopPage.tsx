import { useState } from 'react';
import { Heart, Search } from 'lucide-react';
import { PageTransition } from '@/components/PageTransition';

type TabType = 'catalog' | 'categorii' | 'pentru-cine' | 'ocazie';

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState<TabType>('catalog');

  const tabs = [
    { id: 'catalog' as TabType, label: '📦 Catalog' },
    { id: 'categorii' as TabType, label: '📂 Categorii' },
    { id: 'pentru-cine' as TabType, label: '👤 Pentru Cine' },
    { id: 'ocazie' as TabType, label: '🎉 Ocazie' }
  ];

  const products = [
    { id: 1, name: 'Cană Ceramică Premium', price: '89 RON', category: 'Acasă' },
    { id: 2, name: 'Set Lumânări Parfumate', price: '159 RON', category: 'Wellness' },
    { id: 3, name: 'Jurnal Piele Naturală', price: '129 RON', category: 'Papetărie' },
    { id: 4, name: 'Plantă Decorativă', price: '79 RON', category: 'Natură' },
    { id: 5, name: 'Vin Premium + Pahare', price: '249 RON', category: 'Gourmet' },
    { id: 6, name: 'Șal Cashmere', price: '299 RON', category: 'Fashion' }
  ];

  const categories = [
    { id: 1, name: 'Tehnologie', icon: '💻', count: 45 },
    { id: 2, name: 'Fashion', icon: '👗', count: 68 },
    { id: 3, name: 'Wellness', icon: '🧘', count: 52 },
    { id: 4, name: 'Gourmet', icon: '🍷', count: 34 },
    { id: 5, name: 'Acasă', icon: '🏠', count: 89 },
    { id: 6, name: 'Jucării', icon: '🧸', count: 42 }
  ];

  const persons = [
    { id: 1, name: 'Mama', icon: '👩', gradient: 'from-pink-500 to-rose-500' },
    { id: 2, name: 'Tata', icon: '👨', gradient: 'from-blue-500 to-cyan-500' },
    { id: 3, name: 'Iubit/ă', icon: '💑', gradient: 'from-red-500 to-pink-500' },
    { id: 4, name: 'Prieten/ă', icon: '🤝', gradient: 'from-purple-500 to-pink-500' },
    { id: 5, name: 'Copil', icon: '👶', gradient: 'from-yellow-500 to-orange-500' },
    { id: 6, name: 'Coleg', icon: '💼', gradient: 'from-green-500 to-emerald-500' }
  ];

  const occasions = [
    { id: 1, name: 'Ziua de Naștere', icon: '🎂' },
    { id: 2, name: 'Crăciun', icon: '🎄' },
    { id: 3, name: 'Valentine\'s Day', icon: '💝' },
    { id: 4, name: 'Aniversare', icon: '💍' },
    { id: 5, name: '8 Martie', icon: '🌸' },
    { id: 6, name: 'Absolvire', icon: '🎓' }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Header */}
        <div className="px-6 py-4">
          <h1 className="text-2xl font-semibold mb-4">Magazin</h1>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Caută produse..."
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 mb-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-[hsl(32,100%,50%)] text-background'
                    : 'bg-card text-foreground border border-border'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-6">
          {activeTab === 'catalog' && (
            <div className="grid grid-cols-2 gap-4">
              {products.map((product) => (
                <div key={product.id} className="bg-card rounded-2xl overflow-hidden border border-border">
                  <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 relative">
                    <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-3">
                    <span className="text-xs text-muted-foreground">{product.category}</span>
                    <h3 className="font-medium text-sm mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-[hsl(32,100%,50%)] font-semibold">{product.price}</span>
                      <button className="text-xs text-[hsl(32,100%,50%)]">Adaugă</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'categorii' && (
            <div className="grid grid-cols-2 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className="bg-card rounded-2xl p-6 border border-border hover:border-primary transition-colors"
                >
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <h3 className="font-semibold mb-1">{category.name}</h3>
                  <p className="text-xs text-muted-foreground">{category.count} produse</p>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'pentru-cine' && (
            <div className="grid grid-cols-2 gap-4">
              {persons.map((person) => (
                <button
                  key={person.id}
                  className={`bg-gradient-to-br ${person.gradient} rounded-2xl p-6 text-white`}
                >
                  <div className="text-4xl mb-2">{person.icon}</div>
                  <h3 className="font-semibold">{person.name}</h3>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'ocazie' && (
            <div className="space-y-3">
              {occasions.map((occasion) => (
                <button
                  key={occasion.id}
                  className="w-full bg-card rounded-2xl p-4 border border-border hover:border-primary transition-colors flex items-center gap-4"
                >
                  <div className="text-3xl">{occasion.icon}</div>
                  <h3 className="font-semibold text-left">{occasion.name}</h3>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
