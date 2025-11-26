import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

interface ProductFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const categories = [
  { id: "all", label: "All Products" },
  { id: "furniture", label: "Furniture" },
  { id: "clothing", label: "Clothing" },
  { id: "paintings", label: "Paintings" },
  { id: "crafts", label: "Crafts" },
];

export const ProductFilters = ({
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: ProductFiltersProps) => {
  return (
    <div className="mb-8 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search products or artisans..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category.id)}
          >
            {category.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
