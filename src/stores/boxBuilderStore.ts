import { create } from 'zustand';
import { BoxType, Product, SelectedProduct } from '@/types/giftbox';

interface BoxBuilderStore {
  currentStep: number;
  selectedBoxType: BoxType | null;
  selectedProducts: SelectedProduct[];
  boxName: string;
  
  // Computed values
  totalValue: number;
  productCount: number;
  
  // Actions
  setStep: (step: number) => void;
  setBoxType: (type: BoxType) => void;
  setBoxName: (name: string) => void;
  addProduct: (product: Product) => boolean;
  removeProduct: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  canAddProduct: (product: Product) => { canAdd: boolean; reason?: string };
  reset: () => void;
}

export const useBoxBuilderStore = create<BoxBuilderStore>((set, get) => ({
  currentStep: 1,
  selectedBoxType: null,
  selectedProducts: [],
  boxName: '',
  totalValue: 0,
  productCount: 0,
  
  setStep: (step) => set({ currentStep: step }),
  
  setBoxType: (type) => set({ 
    selectedBoxType: type,
    currentStep: 2,
    selectedProducts: [],
    totalValue: 0,
    productCount: 0
  }),
  
  setBoxName: (name) => set({ boxName: name }),
  
  addProduct: (product) => {
    const state = get();
    const { canAdd, reason } = state.canAddProduct(product);
    
    if (!canAdd) {
      return false;
    }
    
    const existingIndex = state.selectedProducts.findIndex(
      p => p.product.id === product.id
    );
    
    let newProducts: SelectedProduct[];
    
    if (existingIndex >= 0) {
      newProducts = state.selectedProducts.map((item, index) =>
        index === existingIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newProducts = [...state.selectedProducts, { product, quantity: 1 }];
    }
    
    const newTotalValue = newProducts.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const newProductCount = newProducts.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    
    set({
      selectedProducts: newProducts,
      totalValue: newTotalValue,
      productCount: newProductCount
    });
    
    return true;
  },
  
  removeProduct: (productId) => {
    const state = get();
    const newProducts = state.selectedProducts.filter(
      p => p.product.id !== productId
    );
    
    const newTotalValue = newProducts.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const newProductCount = newProducts.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    
    set({
      selectedProducts: newProducts,
      totalValue: newTotalValue,
      productCount: newProductCount
    });
  },
  
  updateQuantity: (productId, quantity) => {
    const state = get();
    
    if (quantity <= 0) {
      state.removeProduct(productId);
      return;
    }
    
    const newProducts = state.selectedProducts.map(item =>
      item.product.id === productId
        ? { ...item, quantity }
        : item
    );
    
    const newTotalValue = newProducts.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const newProductCount = newProducts.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    
    // Check limits
    if (state.selectedBoxType) {
      if (newProductCount > state.selectedBoxType.maxProducts) {
        return;
      }
      if (newTotalValue > state.selectedBoxType.maxValue) {
        return;
      }
    }
    
    set({
      selectedProducts: newProducts,
      totalValue: newTotalValue,
      productCount: newProductCount
    });
  },
  
  canAddProduct: (product) => {
    const state = get();
    
    if (!state.selectedBoxType) {
      return { canAdd: false, reason: 'Selectează mai întâi tipul de cutie' };
    }
    
    const newProductCount = state.productCount + 1;
    const newTotalValue = state.totalValue + product.price;
    
    if (newProductCount > state.selectedBoxType.maxProducts) {
      return { 
        canAdd: false, 
        reason: `Limită de ${state.selectedBoxType.maxProducts} produse atinsă. Treci la ${state.selectedBoxType.name === 'Elegant' ? 'Luxury' : state.selectedBoxType.name === 'Luxury' ? 'Royal' : 'Legend'}?`
      };
    }
    
    if (newTotalValue > state.selectedBoxType.maxValue) {
      return { 
        canAdd: false, 
        reason: `Limită de ${state.selectedBoxType.maxValue} RON atinsă. Treci la un plan superior?`
      };
    }
    
    return { canAdd: true };
  },
  
  reset: () => set({
    currentStep: 1,
    selectedBoxType: null,
    selectedProducts: [],
    boxName: '',
    totalValue: 0,
    productCount: 0
  })
}));
