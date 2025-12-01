import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Heart, Trash2, ShoppingCart } from "lucide-react";
import { useWishlistStore } from "@/stores/wishlistStore";

export const WishlistDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, moveToCart, clearWishlist } = useWishlistStore();
  
  const totalItems = items.length;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button 
          className="relative p-2 hover:bg-muted/20 rounded-full transition-colors"
          aria-label="Favorite"
        >
          <Heart className={totalItems > 0 ? "w-5 h-5 fill-primary text-primary" : "w-5 h-5"} />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary">
              {totalItems}
            </Badge>
          )}
        </button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle>Favorite</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? "Nu ai produse favorite" : `${totalItems} produs${totalItems !== 1 ? 'e' : ''} salvat${totalItems !== 1 ? 'e' : ''}`}
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nu ai produse favorite</p>
                <p className="text-sm text-muted-foreground mt-2">Apasă pe ❤️ pentru a salva produse</p>
              </div>
            </div>
          ) : (
            <>
              {/* Scrollable items area */}
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.node.id} className="flex gap-4 p-2 border border-border rounded-lg">
                      <div className="w-20 h-20 bg-secondary/20 rounded-md overflow-hidden flex-shrink-0">
                        {item.node.images?.edges?.[0]?.node && (
                          <img
                            src={item.node.images.edges[0].node.url}
                            alt={item.node.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{item.node.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {item.node.description}
                        </p>
                        <p className="font-semibold mt-2">
                          {item.node.priceRange.minVariantPrice.currencyCode} {parseFloat(item.node.priceRange.minVariantPrice.amount).toFixed(2)}
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeItem(item.node.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => moveToCart(item)}
                          disabled={!item.node.variants.edges[0]?.node.availableForSale}
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Fixed actions section */}
              <div className="flex-shrink-0 space-y-3 pt-4 border-t bg-background">
                <Button 
                  onClick={clearWishlist}
                  variant="outline"
                  className="w-full" 
                  size="lg"
                  disabled={items.length === 0}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Șterge toate
                </Button>
                
                <Button 
                  onClick={() => {
                    items.forEach(item => moveToCart(item));
                    setIsOpen(false);
                  }}
                  className="w-full" 
                  size="lg"
                  disabled={items.length === 0}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Adaugă toate în coș
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
