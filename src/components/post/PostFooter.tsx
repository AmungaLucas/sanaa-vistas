import PostActions from "@/components/PostActions";
import ShareButtons from "@/components/ShareButtons";

interface PostFooterProps {
  liked: boolean;
  bookmarked: boolean;
  onLike: () => void;
  onBookmark: () => void;
  shareUrl: string;
  shareTitle: string;
}

const PostFooter = ({
  liked,
  bookmarked,
  onLike,
  onBookmark,
  shareUrl,
  shareTitle,
}: PostFooterProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-4 border-t border-border">
      <PostActions
        initialLiked={liked}
        initialBookmarked={bookmarked}
        onLike={onLike}
        onBookmark={onBookmark}
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
