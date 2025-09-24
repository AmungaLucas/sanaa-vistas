import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { User, Clock } from "lucide-react";
import { getComments, type Comment } from "@/lib/comments";

interface CommentsListProps {
  postId: string;
  refreshTrigger: number;
}

export const CommentsList = ({ postId, refreshTrigger }: CommentsListProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      const commentsData = await getComments(postId);
      setComments(commentsData);
      setLoading(false);
    };

    fetchComments();
  }, [postId, refreshTrigger]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-24"></div>
                <div className="w-4 h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-32"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <Card key={comment.id} className="feature-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-poppins font-medium">{comment.authorName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{formatDate(comment.createdAt)}</span>
              </div>
            </div>
            <p className="font-lora text-content leading-relaxed">
              {comment.content}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};