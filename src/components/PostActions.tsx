import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

type PostActionsProps = {
  initialLiked?: boolean;
  initialBookmarked?: boolean;
  onLike?: (liked: boolean) => void;
  onBookmark?: (bookmarked: boolean) => void;
  isAuthenticated?: boolean;
};

const PostActions: React.FC<PostActionsProps> = ({
  initialLiked = false,
  initialBookmarked = false,
  onLike,
  onBookmark,
  isAuthenticated = false,
}) => {
  const [liked, setLiked] = useState(initialLiked);
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleLike = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like posts",
        action: (
          <Button size="sm" onClick={() => navigate("/auth")}>
            Sign In
          </Button>
        ),
      });
      return;
    }
    const newLiked = !liked;
    setLiked(newLiked);
    onLike?.(newLiked);
  };

  const toggleBookmark = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save posts",
        action: (
          <Button size="sm" onClick={() => navigate("/auth")}>
            Sign In
          </Button>
        ),
      });
      return;
    }
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
