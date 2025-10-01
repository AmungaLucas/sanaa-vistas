import { Badge } from "@/components/ui/badge";

const PostCategories = ({ categories }) => (
  <div className="flex flex-wrap gap-2 mb-3">
    {categories.map((category) => (
      <Badge key={category} variant="secondary" className="text-xs">
        {category}
      </Badge>
    ))}
  </div>
);

export default PostCategories;
