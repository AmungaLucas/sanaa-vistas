import PostActions from "@/components/PostActions";
import ShareButtons from "@/components/ShareButtons";

interface PostFooterProps {
  liked: boolean;
  bookmarked: boolean;
  onLike: () => void;
  onBookmark: () => void;
  shareUrl: string;
  shareTitle: string;
  isAuthenticated: boolean;
}

const PostFooter = ({
  liked,
  bookmarked,
  onLike,
  onBookmark,
  shareUrl,
  shareTitle,
  isAuthenticated,
}: PostFooterProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-4 border-t border-border">
      <PostActions
        initialLiked={liked}
        initialBookmarked={bookmarked}
        onLike={onLike}
        onBookmark={onBookmark}
        isAuthenticated={isAuthenticated}
      />
      <ShareButtons
        url={shareUrl}
        title={shareTitle}
        text={`Check out this article: ${shareTitle}`}
      />
    </div>
  );
};

export default PostFooter;
