import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  className = "",
}: {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  className?: string;
}) => {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input
        type="text"
        placeholder="Search articles..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 font-lora"
      />
    </div>
  );
};

export default SearchBar;
