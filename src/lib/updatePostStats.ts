/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/updatePostStats.ts
import {
  doc,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

// Helper function to ensure document exists
const ensureDocExists = async (docRef: any, initialData: any) => {
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    await setDoc(docRef, initialData);
  }
};

// Increment views count
export const incrementViews = async (postId: string) => {
  try {
    console.log("incrementViews called for postId:", postId);

    const postRef = doc(db, "posts", postId);
    await ensureDocExists(postRef, {
      id: postId,
      views: 0,
      likes: 0,
      likedBy: [],
    });

    await updateDoc(postRef, {
      views: increment(1),
    });

    console.log("Views incremented successfully for postId:", postId);
    return { success: true };
  } catch (err) {
    console.error("Error incrementing views:", err);
    return { success: false, error: err };
  }
};

// Toggle like
export const toggleLike = async (
  postId: string,
  userId: string,
  liked: boolean
) => {
  try {
    console.log("toggleLike called:", { postId, userId, liked });

    const postRef = doc(db, "posts", postId);

    // Ensure post document exists
    await ensureDocExists(postRef, {
      id: postId,
      views: 0,
      likes: 0,
      likedBy: [],
    });

    if (liked) {
      await updateDoc(postRef, {
        likes: increment(-1),
        likedBy: arrayRemove(userId),
      });
    } else {
      await updateDoc(postRef, {
        likes: increment(1),
        likedBy: arrayUnion(userId),
      });
    }

    console.log("toggleLike success for postId:", postId);
    return { success: true, liked: !liked };
  } catch (err) {
    console.error("Error toggling like:", err);
    return { success: false, error: err };
  }
};

// Toggle bookmark
export const toggleBookmark = async (
  postId: string,
  userId: string,
  bookmarked: boolean
) => {
  try {
    console.log("toggleBookmark called:", { postId, userId, bookmarked });

    const userRef = doc(db, "users", userId);

    // Ensure user document exists with bookmarks field
    await ensureDocExists(userRef, {
      uid: userId,
      bookmarks: [],
    });

    if (bookmarked) {
      await updateDoc(userRef, {
        bookmarks: arrayRemove(postId),
      });
    } else {
      await updateDoc(userRef, {
        bookmarks: arrayUnion(postId),
      });
    }

    console.log("toggleBookmark success for postId:", postId);
    return { success: true, bookmarked: !bookmarked };
  } catch (err) {
    console.error("Error toggling bookmark:", err);
    return { success: false, error: err };
  }
};
