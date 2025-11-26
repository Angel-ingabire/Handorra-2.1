import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, CreditCard, Smartphone } from "lucide-react";
import { z } from "zod";

const checkoutSchema = z.object({
  deliveryAddress: z.string().trim().min(10, "Please provide a complete delivery address"),
  deliveryPhone: z.string().trim().min(10, "Please provide a valid phone number"),
  paymentMethod: z.enum(["mobile_money", "cash_on_delivery"]),
  notes: z.string().optional(),
});

const Checkout = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    } else if (user) {
      loadCart();
    }
  }, [user, authLoading, navigate]);

  const loadCart = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("cart_items")
      .select(`
        *,
        products (
          id,
          name,
          price,
          image_url,
          stock
        )
      `)
      .eq("user_id", user?.id);

    if (data) {
      setCartItems(data);
      if (data.length === 0) {
        toast.error("Your cart is empty");
        navigate("/products");
      }
    }
    setLoading(false);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.products?.price || 0) * item.quantity;
    }, 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessing(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      deliveryAddress: formData.get("deliveryAddress") as string,
      deliveryPhone: formData.get("deliveryPhone") as string,
      paymentMethod: formData.get("paymentMethod") as "mobile_money" | "cash_on_delivery",
      notes: formData.get("notes") as string,
    };

    try {
      const validated = checkoutSchema.parse(data);

      // Check stock availability
      for (const item of cartItems) {
        if (item.products.stock < item.quantity) {
          toast.error(`${item.products.name} is out of stock`);
          setProcessing(false);
          return;
        }
      }

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          buyer_id: user?.id,
          total_amount: calculateTotal(),
          payment_method: validated.paymentMethod,
          delivery_address: validated.deliveryAddress,
          delivery_phone: validated.deliveryPhone,
          notes: validated.notes || null,
          status: validated.paymentMethod === "cash_on_delivery" ? "pending" : "awaiting_payment",
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.products.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Update product stock
      for (const item of cartItems) {
        const { error: stockError } = await supabase
          .from("products")
          .update({ stock: item.products.stock - item.quantity })
          .eq("id", item.product_id);

        if (stockError) throw stockError;
      }

      // Clear cart
      const { error: clearError } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", user?.id);

      if (clearError) throw clearError;

      toast.success("Order placed successfully!");
      navigate("/");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Failed to process order");
        console.error(error);
      }
    } finally {
      setProcessing(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Checkout</h1>
          <p className="text-muted-foreground">Complete your order</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCheckout} id="checkout-form" className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="deliveryAddress">Delivery Address</Label>
                    <Textarea
                      id="deliveryAddress"
                      name="deliveryAddress"
                      placeholder="Enter your complete delivery address..."
                      rows={3}
                      required
                      disabled={processing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deliveryPhone">Phone Number</Label>
                    <Input
                      id="deliveryPhone"
                      name="deliveryPhone"
                      type="tel"
                      placeholder="+250 XXX XXX XXX"
                      required
                      disabled={processing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <RadioGroup defaultValue="mobile_money" name="paymentMethod">
                      <div className="flex items-center space-x-2 border border-border rounded-lg p-4">
                        <RadioGroupItem value="mobile_money" id="mobile_money" />
                        <Label htmlFor="mobile_money" className="flex items-center cursor-pointer flex-1">
                          <Smartphone className="w-5 h-5 mr-2" />
                          Mobile Money (MTN/Airtel)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border border-border rounded-lg p-4">
                        <RadioGroupItem value="cash_on_delivery" id="cash_on_delivery" />
                        <Label htmlFor="cash_on_delivery" className="flex items-center cursor-pointer flex-1">
                          <CreditCard className="w-5 h-5 mr-2" />
                          Cash on Delivery
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Order Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="Any special instructions for delivery..."
                      rows={2}
                      disabled={processing}
                    />
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.products?.name} × {item.quantity}</span>
                      <span>{formatPrice(item.products?.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(calculateTotal())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">{formatPrice(calculateTotal())}</span>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  form="checkout-form" 
                  className="w-full" 
                  size="lg"
                  disabled={processing}
                >
                  {processing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Place Order"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
