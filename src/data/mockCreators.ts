import { CreatorProfile, Ritual, Moment, GiftBox } from '@/types/giftbox';

const mockRituals: Ritual[] = [
  {
    id: "ritual-1",
    title: "Morning Coffee Ritual",
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
    steps: 3,
    description: "Începe ziua cu un ritual de cafea perfect"
  },
  {
    id: "ritual-2",
    title: "Spa at Home",
    imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400",
    steps: 5,
    description: "Transformă-ți baia într-un spa de lux"
  },
  {
    id: "ritual-3",
    title: "Wine Tasting Evening",
    imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400",
    steps: 4,
    description: "Organizează o seară de degustare de vinuri"
  }
];

const mockMoments: Moment[] = [
  {
    id: "moment-1",
    title: "Unboxing Royal Box",
    videoThumbnail: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400",
    videoUrl: ""
  },
  {
    id: "moment-2",
    title: "Christmas Vibe",
    videoThumbnail: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400",
    videoUrl: ""
  },
  {
    id: "moment-3",
    title: "Packing Process",
    videoThumbnail: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400",
    videoUrl: ""
  },
  {
    id: "moment-4",
    title: "Behind the Scenes",
    videoThumbnail: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400",
    videoUrl: ""
  }
];

const mockBoxes: GiftBox[] = [
  {
    id: "box-1",
    creatorId: "creator-1",
    name: "Royal Wine Experience",
    boxType: "Royal",
    products: [],
    totalValue: 450,
    ordersCount: 42,
    isPublished: true,
    imageUrl: "https://images.unsplash.com/photo-1543332164-6e82f355badc?w=400",
    createdAt: new Date("2024-01-15")
  },
  {
    id: "box-2",
    creatorId: "creator-1",
    name: "Cozy Winter Night",
    boxType: "Luxury",
    products: [],
    totalValue: 320,
    ordersCount: 28,
    isPublished: true,
    imageUrl: "https://images.unsplash.com/photo-1513135467880-6c41603bbb5f?w=400",
    createdAt: new Date("2024-02-01")
  },
  {
    id: "box-3",
    creatorId: "creator-1",
    name: "Sweet Celebration",
    boxType: "Elegant",
    products: [],
    totalValue: 280,
    ordersCount: 15,
    isPublished: true,
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    createdAt: new Date("2024-03-10")
  }
];

export const mockCreators: CreatorProfile[] = [
  {
    id: "creator-1",
    username: "alexandru.gift",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    bio: "Creator de experiențe | Curator de vinuri | Pasionat de estetică și detalii. Fiecare cutie spune o poveste. 🎁✨",
    stats: {
      followers: 1240,
      boxesSold: 85,
      rating: 4.9
    },
    content: {
      boxes: mockBoxes,
      rituals: mockRituals,
      moments: mockMoments
    }
  },
  {
    id: "creator-2",
    username: "maria.curates",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    bio: "Specializată în cadouri pentru ea 💝 Aromaterapeut certificat | Creez experiențe de wellness",
    stats: {
      followers: 890,
      boxesSold: 52,
      rating: 4.8
    },
    content: {
      boxes: [mockBoxes[0]],
      rituals: [mockRituals[1]],
      moments: [mockMoments[0], mockMoments[1]]
    }
  },
  {
    id: "creator-3",
    username: "gourmet.box",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
    bio: "Chef & Food Stylist 🍷 Creez box-uri gourmet pentru pasionații de gastronomie",
    stats: {
      followers: 2100,
      boxesSold: 156,
      rating: 4.95
    },
    content: {
      boxes: mockBoxes,
      rituals: [mockRituals[2]],
      moments: mockMoments
    }
  }
];

export const getCreatorByUsername = (username: string): CreatorProfile | undefined => {
  return mockCreators.find(c => c.username === username.replace('@', ''));
};
