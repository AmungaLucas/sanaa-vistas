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
  deleteDoc,
  serverTimestamp,
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

// Check if user has liked a post
export const checkUserLike = async (
  postId: string,
  userId: string
): Promise<boolean> => {
  try {
    const likeRef = doc(db, "posts", postId, "likes", userId);
    const likeSnap = await getDoc(likeRef);
    return likeSnap.exists();
  } catch (err) {
    console.error("Error checking user like:", err);
    return false;
  }
};

// Toggle like using subcollection
export const toggleLike = async (
  postId: string,
  userId: string,
  liked: boolean
) => {
  try {
    console.log("toggleLike called:", { postId, userId, liked });

    const postRef = doc(db, "posts", postId);
    const likeRef = doc(db, "posts", postId, "likes", userId);

    // Ensure post document exists
    await ensureDocExists(postRef, {
      id: postId,
      views: 0,
      likes: 0,
    });

    if (liked) {
      // Remove like
      await deleteDoc(likeRef);
      await updateDoc(postRef, {
        likes: increment(-1),
      });
    } else {
      // Add like
      await setDoc(likeRef, {
        userId,
        likedAt: serverTimestamp(),
      });
      await updateDoc(postRef, {
        likes: increment(1),
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
