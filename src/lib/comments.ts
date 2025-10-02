import {
  collection,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
  onSnapshot,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebaseConfig";

// Add a new comment
export const addComment = async (
  postId: string,
  userId: string,
  userName: string,
  userAvatar: string | undefined,
  content: string
) => {
  try {
    // Ensure post document exists before adding comment
    const postRef = doc(db, "posts", postId);
    const postSnap = await getDoc(postRef);
    
    if (!postSnap.exists()) {
      // Create minimal post document if it doesn't exist
      await setDoc(postRef, {
        id: postId,
        createdAt: serverTimestamp(),
      });
    }

    const commentsRef = collection(db, "posts", postId, "comments");
    const newComment = {
      userId,
      userName,
      userAvatar: userAvatar || "",
      content,
      createdAt: serverTimestamp(),
    };

    await addDoc(commentsRef, newComment);
    console.log("Comment added successfully:", newComment);

    return { success: true };
  } catch (err) {
    console.error("Error adding comment:", err);
    return { success: false, error: err };
  }
};

// Real-time listener for comments
export const listenToComments = (postId: string, callback: (comments: any[]) => void) => {
  try {
    const commentsRef = collection(db, "posts", postId, "comments");
    const q = query(commentsRef, orderBy("createdAt", "desc"));

    return onSnapshot(q, (snapshot) => {
      const comments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Comments fetched:", comments.length);
      callback(comments);
    });
  } catch (err) {
    console.error("Error listening to comments:", err);
    return () => {};
  }
};
