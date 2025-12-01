import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ShopifyProduct, CartItem } from '@/types/shopify';
import { useCartStore } from './cartStore';
import { toast } from 'sonner';

interface WishlistStore {
  items: ShopifyProduct[];
  
  // Actions
  addItem: (product: ShopifyProduct) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: ShopifyProduct) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  moveToCart: (product: ShopifyProduct) => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const { items } = get();
        const exists = items.find(item => item.node.id === product.node.id);
        
        if (!exists) {
          set({ items: [...items, product] });
          toast.success('Produs adăugat la favorite', {
            description: product.node.title
          });
        }
      },

      removeItem: (productId) => {
        const { items } = get();
        const product = items.find(item => item.node.id === productId);
        
        set({
          items: items.filter(item => item.node.id !== productId)
        });
        
        if (product) {
          toast.success('Produs eliminat din favorite', {
            description: product.node.title
          });
        }
      },

      toggleItem: (product) => {
        const { items, addItem, removeItem } = get();
        const exists = items.find(item => item.node.id === product.node.id);
        
        if (exists) {
          removeItem(product.node.id);
        } else {
          addItem(product);
        }
      },

      isInWishlist: (productId) => {
        const { items } = get();
        return items.some(item => item.node.id === productId);
      },

      clearWishlist: () => {
        set({ items: [] });
        toast.success('Wishlist golit');
      },

      moveToCart: (product) => {
        const { removeItem } = get();
        const addToCart = useCartStore.getState().addItem;
        
        // Get first available variant
        const firstVariant = product.node.variants.edges[0]?.node;
        
        if (firstVariant && firstVariant.availableForSale) {
          const cartItem: CartItem = {
            product,
            variantId: firstVariant.id,
            variantTitle: firstVariant.title,
            price: firstVariant.price,
            quantity: 1,
            selectedOptions: firstVariant.selectedOptions
          };
          
          addToCart(cartItem);
          removeItem(product.node.id);
          
          toast.success('Produs mutat în coș', {
            description: product.node.title
          });
        } else {
          toast.error('Produsul nu este disponibil');
        }
      },
    }),
    {
      name: 'givaora-wishlist',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
