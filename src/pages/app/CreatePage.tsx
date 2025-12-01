import { useState } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { PageTransition } from '@/components/PageTransition';
import { useNavigate } from 'react-router-dom';

export default function CreatePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const occasions = [
    { id: 1, name: 'Ziua de Naștere', icon: '🎂' },
    { id: 2, name: 'Crăciun', icon: '🎄' },
    { id: 3, name: 'Valentine\'s Day', icon: '💝' },
    { id: 4, name: 'Aniversare', icon: '💍' },
    { id: 5, name: '8 Martie', icon: '🌸' },
    { id: 6, name: 'Absolvire', icon: '🎓' }
  ];

  const persons = [
    { id: 1, name: 'Mama', icon: '👩', gradient: 'from-pink-500 to-rose-500' },
    { id: 2, name: 'Tata', icon: '👨', gradient: 'from-blue-500 to-cyan-500' },
    { id: 3, name: 'Iubit/ă', icon: '💑', gradient: 'from-red-500 to-pink-500' },
    { id: 4, name: 'Prieten/ă', icon: '🤝', gradient: 'from-purple-500 to-pink-500' }
  ];

  const budgets = [
    { id: 1, label: 'Accesibil', range: '< 150 RON', value: 150 },
    { id: 2, label: 'Mediu', range: '150 - 500 RON', value: 350 },
    { id: 3, label: 'Premium', range: '500 - 1000 RON', value: 750 },
    { id: 4, label: 'Exclusiv', range: '> 1000 RON', value: 1500 }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Header */}
        <div className="px-6 py-4 flex items-center gap-4">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-[hsl(32,100%,50%)]" />
              <h1 className="text-xl font-semibold">Gift Builder</h1>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    s <= step ? 'bg-[hsl(32,100%,50%)]' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-semibold mb-2">Care este ocazia?</h2>
              <p className="text-muted-foreground mb-6">
                Alege evenimentul pentru care vrei să creezi cadoul perfect
              </p>
              <div className="grid grid-cols-2 gap-4">
                {occasions.map((occasion) => (
                  <button
                    key={occasion.id}
                    onClick={() => setStep(2)}
                    className="bg-card rounded-2xl p-6 border border-border hover:border-primary transition-all hover:scale-105"
                  >
                    <div className="text-4xl mb-2">{occasion.icon}</div>
                    <h3 className="font-semibold text-sm">{occasion.name}</h3>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-semibold mb-2">Pentru cine este?</h2>
              <p className="text-muted-foreground mb-6">
                Selectează relația ta cu persoana căreia îi faci cadoul
              </p>
              <div className="grid grid-cols-2 gap-4">
                {persons.map((person) => (
                  <button
                    key={person.id}
                    onClick={() => setStep(3)}
                    className={`bg-gradient-to-br ${person.gradient} rounded-2xl p-6 text-white hover:scale-105 transition-transform`}
                  >
                    <div className="text-4xl mb-2">{person.icon}</div>
                    <h3 className="font-semibold">{person.name}</h3>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-semibold mb-2">Care este bugetul tău?</h2>
              <p className="text-muted-foreground mb-6">
                Alege intervalul de preț care ți se potrivește
              </p>
              <div className="space-y-3">
                {budgets.map((budget) => (
                  <button
                    key={budget.id}
                    onClick={() => navigate('/')}
                    className="w-full bg-card rounded-2xl p-5 border border-border hover:border-primary transition-all hover:scale-[1.02] text-left"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold">{budget.label}</h3>
                      <span className="text-[hsl(32,100%,50%)] font-semibold">{budget.range}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[hsl(32,100%,50%)] to-[hsl(32,100%,40%)]"
                        style={{ width: `${(budget.value / 1500) * 100}%` }}
                      />
                    </div>
                  </button>
                ))}
              </div>

              <button className="w-full mt-8 bg-gradient-to-r from-[hsl(32,100%,50%)] to-[hsl(32,100%,40%)] text-background py-4 rounded-full font-semibold text-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 create-button-glow">
                <Sparkles className="w-6 h-6" />
                Generează Gift Perfect
              </button>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
