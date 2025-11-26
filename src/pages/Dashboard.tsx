import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EditProductDialog } from "@/components/EditProductDialog";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Plus, Package } from "lucide-react";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().trim().min(3, "Product name must be at least 3 characters").max(100, "Product name is too long"),
  description: z.string().trim().min(10, "Description must be at least 10 characters").max(1000, "Description is too long"),
  price: z.number().positive("Price must be greater than 0"),
  category: z.string().min(1, "Please select a category"),
  stock: z.number().int().min(0, "Stock cannot be negative"),
});

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    } else if (user) {
      checkUserRole();
      loadProducts();
    }
  }, [user, authLoading, navigate]);

  const checkUserRole = async () => {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user?.id)
      .in("role", ["seller", "admin"]);

    if (data && data.length > 0) {
      setIsSeller(true);
    }
  };

  const loadProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("seller_id", user?.id)
      .order("created_at", { ascending: false });

    if (data) {
      setProducts(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const imageFile = formData.get("image") as File;
    
    const data = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      category: formData.get("category") as string,
      stock: parseInt(formData.get("stock") as string),
    };

    try {
      // Validate image file
      if (!imageFile || imageFile.size === 0) {
        throw new Error("Please select an image");
      }

      if (!imageFile.type.startsWith("image/")) {
        throw new Error("Please upload a valid image file");
      }

      if (imageFile.size > 5 * 1024 * 1024) {
        throw new Error("Image size must be less than 5MB");
      }

      const validated = productSchema.parse(data);

      // Check if user has seller role
      if (!isSeller) {
        // Add seller role
        const { error: roleError } = await supabase
          .from("user_roles")
          .insert({ user_id: user?.id, role: "seller" });

        if (roleError && !roleError.message.includes("duplicate")) {
          throw roleError;
        }
        setIsSeller(true);
      }

      // Upload image to storage
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${user?.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, imageFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);

      const { error } = await supabase.from("products").insert({
        seller_id: user?.id,
        name: validated.name,
        description: validated.description,
        price: validated.price,
        category: validated.category,
        stock: validated.stock,
        image_url: publicUrl,
        is_active: true,
      });

      if (error) throw error;

      toast.success("Product added successfully!");
      loadProducts();
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to add product");
      }
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
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
          <h1 className="text-4xl font-bold mb-2">Seller Dashboard</h1>
          <p className="text-muted-foreground">Manage your products and grow your business</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Add New Product
              </CardTitle>
              <CardDescription>List a new product for sale on Handorra</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g., Handwoven Basket"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your product..."
                    rows={4}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (RWF)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="100"
                      placeholder="25000"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      min="0"
                      placeholder="10"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" required disabled={loading}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="paintings">Paintings</SelectItem>
                      <SelectItem value="crafts">Crafts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Product Image</Label>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    required
                    disabled={loading}
                  />
                  <p className="text-xs text-muted-foreground">Max file size: 5MB</p>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding Product...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Product
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Your Products ({products.length})
                </CardTitle>
                <CardDescription>Products you've listed on Handorra</CardDescription>
              </CardHeader>
              <CardContent>
                {products.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    You haven't added any products yet. Start by adding your first product!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div key={product.id} className="flex gap-4 p-4 border border-border rounded-lg">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
                          <p className="text-primary font-bold mt-1">
                            {new Intl.NumberFormat('en-RW', {
                              style: 'currency',
                              currency: 'RWF',
                              minimumFractionDigits: 0,
                            }).format(product.price)}
                          </p>
                          <p className="text-xs text-muted-foreground">Stock: {product.stock}</p>
                          <div className="mt-2">
                            <EditProductDialog product={product} onUpdate={loadProducts} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
