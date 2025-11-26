import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Pencil } from "lucide-react";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().trim().min(3, "Product name must be at least 3 characters").max(100, "Product name is too long"),
  description: z.string().trim().min(10, "Description must be at least 10 characters").max(1000, "Description is too long"),
  price: z.number().positive("Price must be greater than 0"),
  category: z.string().min(1, "Please select a category"),
  stock: z.number().int().min(0, "Stock cannot be negative"),
});

interface EditProductDialogProps {
  product: any;
  onUpdate: () => void;
}

export const EditProductDialog = ({ product, onUpdate }: EditProductDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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
      const validated = productSchema.parse(data);

      let imageUrl = product.image_url;

      // Only upload new image if one was selected
      if (imageFile && imageFile.size > 0) {
        if (!imageFile.type.startsWith("image/")) {
          throw new Error("Please upload a valid image file");
        }

        if (imageFile.size > 5 * 1024 * 1024) {
          throw new Error("Image size must be less than 5MB");
        }

        // Get user from supabase auth
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) throw new Error("User not authenticated");

        // Upload new image to storage
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      const { error } = await supabase
        .from("products")
        .update({
          name: validated.name,
          description: validated.description,
          price: validated.price,
          category: validated.category,
          stock: validated.stock,
          image_url: imageUrl,
        })
        .eq("id", product.id);

      if (error) throw error;

      toast.success("Product updated successfully!");
      setOpen(false);
      onUpdate();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to update product");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="w-4 h-4 mr-2" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>Update your product details</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Product Name</Label>
              <Input
                id="edit-name"
                name="name"
                defaultValue={product.name}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                defaultValue={product.description}
                rows={3}
                required
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-price">Price (RWF)</Label>
                <Input
                  id="edit-price"
                  name="price"
                  type="number"
                  min="0"
                  step="100"
                  defaultValue={product.price}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-stock">Stock</Label>
                <Input
                  id="edit-stock"
                  name="stock"
                  type="number"
                  min="0"
                  defaultValue={product.stock}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-category">Category</Label>
              <Select name="category" defaultValue={product.category} required disabled={loading}>
                <SelectTrigger>
                  <SelectValue />
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
              <Label htmlFor="edit-image">Product Image</Label>
              <Input
                id="edit-image"
                name="image"
                type="file"
                accept="image/*"
                disabled={loading}
              />
              <p className="text-xs text-muted-foreground">Leave empty to keep current image. Max file size: 5MB</p>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Product"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
