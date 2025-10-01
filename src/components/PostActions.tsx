import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Bookmark } from "lucide-react";

type PostActionsProps = {
  initialLiked?: boolean;
  initialBookmarked?: boolean;
  onLike?: (liked: boolean) => void;
  onBookmark?: (bookmarked: boolean) => void;
};

const PostActions: React.FC<PostActionsProps> = ({
  initialLiked = false,
  initialBookmarked = false,
  onLike,
  onBookmark,
}) => {
  const [liked, setLiked] = useState(initialLiked);
  const [bookmarked, setBookmarked] = useState(initialBookmarked);

  const toggleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    onLike?.(newLiked);
  };

  const toggleBookmark = () => {
    const newBookmarked = !bookmarked;
    setBookmarked(newBookmarked);
    onBookmark?.(newBookmarked);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Like Button */}
      <Button
        variant={liked ? "default" : "outline"}
        size="sm"
        onClick={toggleLike}
        className={liked ? "bg-red-500 hover:bg-red-600 text-white" : ""}
      >
        <Heart className="w-3 h-3 mr-1" />
        {liked ? "Liked" : "Like"}
      </Button>

      {/* Bookmark Button */}
      <Button
        variant={bookmarked ? "default" : "outline"}
        size="sm"
        onClick={toggleBookmark}
      >
        <Bookmark className="w-3 h-3 mr-1" />
        {bookmarked ? "Saved" : "Save"}
      </Button>
    </div>
  );
};

export default PostActions;
