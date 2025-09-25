import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { getUserById } from "./getUserById";
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
    
    const post: Post = {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      publishedAt: data.publishedAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    } as Post;

    // Fetch author data if authorId exists
    if (post.authorId) {
      const author = await getUserById(post.authorId);
      if (author) {
        post.authorProfilePic = author.profilePic;
        post.authorAbout = author.about;
      }
    }
    
    return post;
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
};