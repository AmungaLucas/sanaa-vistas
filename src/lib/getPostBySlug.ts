import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import type { Post } from "./getPosts";

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  try {
    const postsRef = collection(db, "posts");
    const q = query(
      postsRef,
      where("slug", "==", slug),
      where("status", "==", "published")
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const doc = querySnapshot.docs[0];
    const data = doc.data();
    
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      publishedAt: data.publishedAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    } as Post;
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
};