import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Package } from "lucide-react";

const Sellers = () => {
  const { data: sellers, isLoading } = useQuery({
    queryKey: ["sellers"],
    queryFn: async () => {
      // Get all active products with their seller IDs
      const { data: products } = await supabase
        .from("products")
        .select("seller_id")
        .eq("is_active", true);

      if (!products || products.length === 0) return [];

      // Get unique seller IDs
      const uniqueSellerIds = [...new Set(products.map(p => p.seller_id))];

      // Fetch profile information for each seller
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url, location, bio")
        .in("id", uniqueSellerIds);

      if (!profiles) return [];

      // Count products for each seller
      const sellersWithCounts = await Promise.all(
        profiles.map(async (profile) => {
          const { count } = await supabase
            .from("products")
            .select("*", { count: "exact", head: true })
            .eq("seller_id", profile.id)
            .eq("is_active", true);

          return { ...profile, productCount: count || 0 };
        })
      );

      return sellersWithCounts;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Meet Our Artisans</h1>
          <p className="text-muted-foreground">
            Discover the talented craftspeople behind our products
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-24 bg-muted rounded-full w-24 mx-auto mb-4" />
                  <div className="h-4 bg-muted rounded w-3/4 mx-auto mb-2" />
                  <div className="h-3 bg-muted rounded w-1/2 mx-auto" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : sellers && sellers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sellers.map((seller: any) => (
              <Card key={seller.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={seller.avatar_url} />
                    <AvatarFallback>
                      {seller.full_name?.charAt(0) || "A"}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg mb-1">
                    {seller.full_name || "Artisan"}
                  </h3>
                  {seller.location && (
                    <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-2">
                      <MapPin className="w-3 h-3" />
                      <span>{seller.location}</span>
                    </div>
                  )}
                  {seller.bio && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {seller.bio}
                    </p>
                  )}
                  <div className="flex items-center justify-center gap-1 text-sm text-primary">
                    <Package className="w-4 h-4" />
                    <span>{seller.productCount} products</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">No artisans found yet.</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Sellers;
