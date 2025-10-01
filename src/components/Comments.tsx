"use client";

import { useState, useEffect } from "react";
import { addComment, listenToComments } from "@/lib/comments";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import UserAvatar from "@/components/UserAvatar";

const Comments = ({ postId, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
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
            <div>
              <p className="font-semibold text-sm">{c.userName}</p>
              <p className="text-sm text-content">{c.content}</p>
              <span className="text-xs text-muted-foreground">
                {c.createdAt?.toDate
                  ? c.createdAt.toDate().toLocaleString()
                  : new Date(c.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
