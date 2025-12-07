import { BoxType, Plan } from '@/types/giftbox';

export const boxTypes: BoxType[] = [
  {
    id: "elegant",
    name: "Elegant",
    maxProducts: 7,
    maxValue: 350,
    description: "Perfect pentru cadouri rafinate și elegante",
    icon: "✨"
  },
  {
    id: "luxury",
    name: "Luxury",
    maxProducts: 11,
    maxValue: 500,
    description: "Experiență premium pentru ocazii speciale",
    icon: "💎"
  },
  {
    id: "royal",
    name: "Royal",
    maxProducts: 16,
    maxValue: 750,
    description: "Cadoul suprem pentru cei dragi",
    icon: "👑"
  },
  {
    id: "legend",
    name: "Legend",
    maxProducts: 20,
    maxValue: 1000,
    description: "Cel mai exclusivist cadou posibil",
    icon: "🏆"
  },
];

export const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 0,
    features: [
      "7 zile trial complet",
      "5 box-uri pe lună",
      "Acces produse comune",
      "Export foto 1:1 & 4:5",
      "Suport email"
    ],
    maxActiveGifts: 3,
    highlighted: false
  },
  {
    id: "legend",
    name: "Legend",
    price: 39,
    features: [
      "15 box-uri pe lună",
      "Acces produse standard + premium",
      "Poți crea Ritualuri & Colecții",
      "3 creații publicate în feed",
      "Reduceri parteneri 10%",
      "Export video AI",
      "Suport prioritar"
    ],
    highlighted: true
  },
  {
    id: "royal",
    name: "Royal",
    price: 99,
    features: [
      "BOX-uri nelimitate",
      "Acces complet produse + API producători",
      "Poți deveni producător verificat",
      "Pagina profil cu magazin",
      "Ritualuri & Colecții nelimitate",
      "Export video AI nelimitat",
      "Analytics avansate",
      "Suport dedicat 24/7"
    ],
    highlighted: false
  },
];
