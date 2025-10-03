"use client";

import { useState, useEffect } from "react";
import { addComment, listenToComments, deleteComment, editComment } from "@/lib/comments";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import UserAvatar from "@/components/UserAvatar";
import { Pencil, Trash2 } from "lucide-react";

const Comments = ({ postId, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const navigate = useNavigate();

  // Real-time listener
  useEffect(() => {
    if (!postId) return;

    const unsubscribe = listenToComments(postId, (fetchedComments) => {
      setComments(fetchedComments);
    });

    return () => unsubscribe();
  }, [postId]);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;
    if (!newComment.trim()) return;

    setNewComment("");

    await addComment(
      postId,
      currentUser.id,
      currentUser.name,
      currentUser.avatar,
      newComment
    );
  };

  // Handle delete
  const handleDelete = async (commentId: string) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    await deleteComment(postId, commentId);
  };

  // Handle edit
  const handleEdit = (comment: any) => {
    setEditingCommentId(comment.id);
    setEditContent(comment.content);
  };

  // Handle save edit
  const handleSaveEdit = async (commentId: string) => {
    if (!editContent.trim()) return;
    await editComment(postId, commentId, editContent);
    setEditingCommentId(null);
    setEditContent("");
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditContent("");
  };

  // Check if comment can be edited/deleted (within 5 minutes)
  const canModifyComment = (comment: any) => {
    if (!currentUser || comment.userId !== currentUser.id) return false;
    const commentTime = comment.createdAt?.toDate ? comment.createdAt.toDate() : new Date(comment.createdAt);
    const now = new Date();
    const diffMinutes = (now.getTime() - commentTime.getTime()) / (1000 * 60);
    return diffMinutes <= 5;
  };

  return (
    <div className="mt-10">
      <h2 className="font-poppins font-bold text-lg text-heading mb-4">
        Comments ({comments.length})
      </h2>

      {/* New Comment Form - Show for authenticated users */}
      {currentUser ? (
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-6">
          <UserAvatar
            photoURL={currentUser.avatar}
            displayName={currentUser.name}
            size="sm"
          />
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <Button type="submit" size="sm">
            Post
          </Button>
        </form>
      ) : (
        <div className="mb-6 p-4 border border-border rounded-xl bg-muted/20 text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Sign in to join the conversation
          </p>
          <Button onClick={() => navigate("/auth")} size="sm">
            Sign In
          </Button>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 && (
          <p className="text-sm text-muted-foreground">No comments yet.</p>
        )}
        {comments.map((c) => (
          <div key={c.id} className="flex gap-3">
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
                  <input
                    type="text"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleSaveEdit(c.id)}>
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-sm text-content mt-1">{c.content}</p>
                  <span className="text-xs text-muted-foreground">
                    {c.createdAt?.toDate
                      ? c.createdAt.toDate().toLocaleString()
                      : new Date(c.createdAt).toLocaleString()}
                    {c.editedAt && " (edited)"}
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
