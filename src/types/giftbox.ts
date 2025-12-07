// Menu recursiv
export interface MenuItem {
  title: string;
  tag?: string;
  href?: string;
  children?: MenuItem[];
}

// Tipuri de cutii
export interface BoxType {
  id: string;
  name: string;
  maxProducts: number;
  maxValue: number; // RON
  description: string;
  icon: string;
}

// Planuri utilizatori
export interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  maxActiveGifts?: number;
  highlighted?: boolean;
}

// Produse
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  tags: string[];
  inStock: boolean;
}

// Produs selectat în box builder
export interface SelectedProduct {
  product: Product;
  quantity: number;
}

// Gift Box-uri create
export interface GiftBox {
  id: string;
  creatorId: string;
  name: string;
  boxType: string;
  products: SelectedProduct[];
  totalValue: number;
  ordersCount: number;
  isPublished: boolean;
  imageUrl?: string;
  createdAt: Date;
}

// Comisioane
export interface Commission {
  giftBoxId: string;
  giftName: string;
  ordersCount: number;
  estimatedCommission: number;
}

// Ritualuri
export interface Ritual {
  id: string;
  title: string;
  imageUrl: string;
  steps: number;
  description?: string;
}

// Momente
export interface Moment {
  id: string;
  title: string;
  videoThumbnail: string;
  videoUrl?: string;
}

// Profil Creator
export interface CreatorProfile {
  id: string;
  username: string;
  avatarUrl: string;
  bio: string;
  stats: {
    followers: number;
    boxesSold: number;
    rating: number;
  };
  content: {
    boxes: GiftBox[];
    rituals: Ritual[];
    moments: Moment[];
  };
}

// User Profile (din baza de date)
export interface UserProfile {
  id: string;
  email: string;
  username: string;
  fullName: string;
  avatarUrl: string;
  bio: string;
  plan: 'basic' | 'legend' | 'royal';
  planExpiresAt?: Date;
  followersCount: number;
  boxesSold: number;
  rating: number;
  isCreator: boolean;
  createdAt: Date;
}

// App Roles
export type AppRole = 'admin' | 'moderator' | 'user' | 'creator';
