import { useState, useEffect } from "react";
import {
  addComment,
  listenToComments,
  deleteComment,
  editComment,
} from "@/lib/comments";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import UserAvatar from "@/components/UserAvatar";
import { Pencil, Trash2 } from "lucide-react";

const Comments = ({ postId, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const navigate = useNavigate();

  // Real-time listener for comments
  useEffect(() => {
    if (!postId) return;

    const unsubscribe = listenToComments(postId, (fetchedComments) => {
      setComments(fetchedComments);
    });

    return () => unsubscribe();
  }, [postId]);

  // Post a new comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser || !newComment.trim()) return;

    const content = newComment.trim();
    setNewComment("");

    await addComment(
      postId,
      currentUser.id,
      currentUser.name,
      currentUser.avatar,
      content
    );
  };

  // Delete a comment
  const handleDelete = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;
    await deleteComment(postId, commentId);
  };

  // Enter edit mode
  const handleEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditContent(comment.content);
  };

  // Save edited comment
  const handleSaveEdit = async (commentId) => {
    if (!editContent.trim()) return;
    await editComment(postId, commentId, editContent);
    setEditingCommentId(null);
    setEditContent("");
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditContent("");
  };

  // Check if comment can be modified (within 5 minutes)
  const canModifyComment = (comment) => {
    if (!currentUser || comment.userId !== currentUser.id) return false;
    const commentTime = comment.createdAt?.toDate
      ? comment.createdAt.toDate()
      : new Date(comment.createdAt);
    const now = new Date();
    const diffMinutes = (now.getTime() - commentTime.getTime()) / (1000 * 60);
    return diffMinutes <= 5;
  };

  return (
    <div className="mt-12 border-t border-border pt-8">
      <h2 className="font-poppins font-semibold text-xl text-heading mb-6">
        Comments{" "}
        <span className="text-muted-foreground">({comments.length})</span>
      </h2>

      {/* New Comment Form */}
      {currentUser ? (
        <form onSubmit={handleSubmit} className="flex items-start gap-3 mb-8">
          <UserAvatar
            photoURL={currentUser.avatar}
            displayName={currentUser.name}
            size="sm"
          />
          <div className="flex-1 flex flex-col gap-2">
            <textarea
              placeholder="Write your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full min-h-[48px] border border-border rounded-xl px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <div className="flex justify-end">
              <Button type="submit" size="sm" disabled={!newComment.trim()}>
                Post
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-8 p-5 border border-border rounded-xl bg-muted/10 text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Sign in to join the conversation
          </p>
          <Button onClick={() => navigate("/auth")} size="sm">
            Sign In
          </Button>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-5">
        {comments.length === 0 && (
          <p className="text-sm text-muted-foreground text-center">
            No comments yet. Be the first to share your thoughts!
          </p>
        )}

        {comments.map((c) => {
          const formattedDate = c.createdAt?.toDate
            ? c.createdAt.toDate().toLocaleString()
            : new Date(c.createdAt).toLocaleString();

          return (
            <div
              key={c.id}
              id={`comment-${c.id}`}
              className="flex gap-3 bg-muted/5 rounded-xl p-3 hover:bg-muted/10 transition"
            >
              <UserAvatar
                photoURL={c.userAvatar}
                displayName={c.userName}
                size="sm"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm">{c.userName}</p>
                  {canModifyComment(c) && editingCommentId !== c.id && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(c)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Edit comment"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Delete comment"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {editingCommentId === c.id ? (
                  <div className="mt-2 space-y-2">
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleSaveEdit(c.id)}
                        type="button"
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancelEdit}
                        type="button"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-content mt-1">{c.content}</p>
                    <span className="text-xs text-muted-foreground">
                      {formattedDate}
                      {c.editedAt && " (edited)"}
                    </span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
