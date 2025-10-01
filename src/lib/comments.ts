import {
  collection,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

import { db } from "@/lib/firebaseConfig";

// Add a new comment
export const addComment = async (
  postId,
  userId,
  userName,
  userAvatar,
  content
) => {
  try {
    const commentsRef = collection(db, "posts", postId, "comments");
    const newComment = {
      userId,
      userName,
      userAvatar,
      content,
      createdAt: serverTimestamp(),
    };

    await addDoc(commentsRef, newComment);

    return { success: true };
  } catch (err) {
    console.error("Error adding comment:", err);
    return { success: false, error: err };
  }
};

// Real-time listener for comments
export const listenToComments = (postId, callback) => {
  try {
    const commentsRef = collection(db, "posts", postId, "comments");
    const q = query(commentsRef, orderBy("createdAt", "desc"));

    return onSnapshot(q, (snapshot) => {
      const comments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(comments);
    });
  } catch (err) {
    console.error("Error listening to comments:", err);
    return () => {};
  }
};
