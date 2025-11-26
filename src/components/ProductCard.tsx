import { Star, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image_url: string;
  seller_id: string;
  rating: number;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { user } = useAuth();
  const [adding, setAdding] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please sign in to add items to cart");
      return;
    }

    setAdding(true);

    // Check if item already in cart
    const { data: existing } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", user.id)
      .eq("product_id", product.id)
      .maybeSingle();

    if (existing) {
      // Update quantity
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity: existing.quantity + 1 })
        .eq("id", existing.id);

      if (error) {
        toast.error("Failed to update cart");
      } else {
        toast.success("Cart updated!");
      }
    } else {
      // Add new item
      const { error } = await supabase
        .from("cart_items")
        .insert({
          user_id: user.id,
          product_id: product.id,
          quantity: 1,
        });

      if (error) {
        toast.error("Failed to add to cart");
      } else {
        toast.success("Added to cart!");
      }
    }

    setAdding(false);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center space-x-1 mb-2">
          <Star className="w-4 h-4 fill-primary text-primary" />
          <span className="text-sm font-medium">{product.rating}</span>
        </div>
        <p className="text-xl font-bold text-primary">{formatPrice(product.price)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          size="sm" 
          onClick={handleAddToCart}
          disabled={adding}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {adding ? "Adding..." : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
};
