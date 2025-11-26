import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { ArrowRight, ShoppingBag, Users, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import furnitureImg from "@/assets/categories/furniture.jpg";
import clothingImg from "@/assets/categories/clothing.jpg";
import paintingsImg from "@/assets/categories/paintings.jpg";
import craftsImg from "@/assets/categories/crafts.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background -z-10" />
        
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Discover Authentic
              <span className="block text-primary">Rwandan Craftsmanship</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect directly with talented artisans. Shop handcrafted furniture, art, clothing, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg">
                <Link to="/products">
                  Explore Products
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg">
                <Link to="/dashboard">Start Selling</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Furniture",
                image: furnitureImg,
                count: "120+ items"
              },
              {
                name: "Clothing",
                image: clothingImg,
                count: "250+ items"
              },
              {
                name: "Paintings",
                image: paintingsImg,
                count: "85+ items"
              },
              {
                name: "Crafts",
                image: craftsImg,
                count: "180+ items"
              }
            ].map((category, index) => (
              <Link
                key={category.name}
                to="/products"
                className="group relative overflow-hidden rounded-2xl aspect-square animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-2xl font-bold mb-1">{category.name}</h3>
                  <p className="text-white/80">{category.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-card shadow-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Direct from Artisans</h3>
              <p className="text-muted-foreground">
                No middlemen. Support creators directly and get authentic handcrafted products.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-card shadow-sm">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Empower Communities</h3>
              <p className="text-muted-foreground">
                Every purchase creates sustainable income for Rwandan artisans and their families.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-card shadow-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Cultural Heritage</h3>
              <p className="text-muted-foreground">
                Preserve and celebrate Rwanda's rich artistic traditions and craftsmanship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers discovering authentic Rwandan craftsmanship.
          </p>
          <Button size="lg" variant="secondary" asChild className="text-lg">
            <Link to="/products">
              Browse All Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p className="mb-2">© 2025 Handorra. Made with ❤️ in Rwanda.</p>
          <p className="text-sm">Empowering artisans, preserving culture, building futures.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
