import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { addComment } from "@/lib/comments";

interface CommentFormProps {
  postId: string;
  onCommentAdded: () => void;
}

export const CommentForm = ({ postId, onCommentAdded }: CommentFormProps) => {
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!authorName.trim() || !content.trim()) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const success = await addComment(postId, authorName.trim(), content.trim());
    
    if (success) {
      toast({
        title: "Comment submitted",
        description: "Your comment has been submitted for review.",
      });
      setAuthorName("");
      setContent("");
      onCommentAdded();
    } else {
      toast({
        title: "Error submitting comment",
        description: "Please try again later.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <Card className="feature-card">
      <CardHeader>
        <CardTitle className="font-poppins text-xl">Leave a Comment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Your name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Textarea
              placeholder="Write your comment..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px] w-full"
            />
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Submitting..." : "Submit Comment"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};