"use client";

import { useState, useEffect } from "react";
import { addComment, listenToComments } from "@/lib/comments";

const Comments = ({ postId, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Real-time listener
  useEffect(() => {
    if (!postId) return;

    const unsubscribe = listenToComments(postId, (fetchedComments) => {
      setComments(fetchedComments);
    });

    return () => unsubscribe(); // cleanup
  }, [postId]);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setNewComment("");

    // Save to Firestore
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
        Comments
      </h2>

      {/* New Comment Form */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-6">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-xl font-medium hover:bg-primary/90"
        >
          Post
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 && (
          <p className="text-sm text-muted-foreground">No comments yet.</p>
        )}
        {comments.map((c) => (
          <div key={c.id} className="flex gap-3">
            <img
              src={c.userAvatar}
              alt={c.userName}
              className="w-10 h-10 rounded-full object-cover"
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
