import { Navbar } from "@/components/Navbar";
import { Heart, Users, Globe, Shield } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            About Handorra
          </h1>
          <p className="text-xl text-muted-foreground text-center mb-12">
            Connecting Rwandan artisans with the world
          </p>

          <div className="prose prose-lg max-w-none mb-16">
            <p className="text-lg leading-relaxed mb-6">
              Handorra is a marketplace dedicated to showcasing and celebrating the
              exceptional craftsmanship of Rwandan artisans. We believe that every
              handmade product tells a story of heritage, skill, and passion.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Our platform bridges the gap between talented craftspeople and customers
              who appreciate authentic, handcrafted goods. By shopping on Handorra,
              you're not just purchasing a product—you're supporting livelihoods,
              preserving cultural traditions, and empowering communities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-card p-8 rounded-lg border">
              <Heart className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Our Mission</h3>
              <p className="text-muted-foreground">
                To empower Rwandan artisans by providing them with a platform to
                showcase their crafts to a global audience, ensuring fair trade and
                sustainable livelihoods.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Community First</h3>
              <p className="text-muted-foreground">
                Every purchase directly supports artisan communities across Rwanda,
                helping to preserve traditional crafts while creating economic
                opportunities.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border">
              <Globe className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Global Reach</h3>
              <p className="text-muted-foreground">
                We connect local artisans with customers worldwide, bringing
                authentic Rwandan craftsmanship to homes across the globe.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border">
              <Shield className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Quality Assured</h3>
              <p className="text-muted-foreground">
                Every product on our platform is carefully vetted to ensure
                authenticity, quality, and adherence to fair trade principles.
              </p>
            </div>
          </div>

          <div className="bg-primary/5 p-8 rounded-lg border border-primary/20 text-center">
            <h3 className="text-2xl font-semibold mb-4">Join Our Journey</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Whether you're an artisan looking to share your craft or a customer
              seeking unique, handmade products, Handorra welcomes you to be part
              of our story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Explore Products
              </a>
              <a
                href="/dashboard"
                className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
              >
                Start Selling
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
