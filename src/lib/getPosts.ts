import { collection, getDocs, query, orderBy, where, limit } from "firebase/firestore";
import { db } from "./firebaseConfig";

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  categories: string[];
  content: string;
  createdAt: Date;
  excerpt: string;
  featuredImage: string;
  likes: number;
  publishedAt: Date;
  slug: string;
  status: string;
  tags: string[];
  title: string;
  updatedAt: Date;
  views: number;
  featured: boolean;
  sponsored: boolean;
  seoDescription: string;
  seoKeywords: string;
  seoTitle: string;
}

export const getPosts = async (): Promise<Post[]> => {
  try {
    const postsRef = collection(db, "posts");
    const q = query(
      postsRef, 
      where("status", "==", "published"),
      orderBy("publishedAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const posts: Post[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      posts.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        publishedAt: data.publishedAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Post);
    });
    
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const getFeaturedPosts = async (): Promise<Post[]> => {
  try {
    const postsRef = collection(db, "posts");
    const q = query(
      postsRef,
      where("status", "==", "published"),
      where("featured", "==", true),
      orderBy("publishedAt", "desc"),
      limit(3)
    );
    
    const querySnapshot = await getDocs(q);
    const posts: Post[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      posts.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        publishedAt: data.publishedAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Post);
    });
    
    return posts;
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    return [];
  }
};

export const getCategories = async (): Promise<string[]> => {
  try {
    const postsRef = collection(db, "posts");
    const q = query(
      postsRef,
      where("status", "==", "published")
    );
    
    const querySnapshot = await getDocs(q);
    const categoriesSet = new Set<string>();
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.categories && Array.isArray(data.categories)) {
        data.categories.forEach((category: string) => categoriesSet.add(category));
      }
    });
    
    return Array.from(categoriesSet).sort();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export { getPostBySlug } from "./getPostBySlug";

export const getTrendingPosts = async (): Promise<Post[]> => {
  try {
    const postsRef = collection(db, "posts");
    const q = query(
      postsRef,
      where("status", "==", "published"),
      orderBy("views", "desc"),
      limit(5)
    );
    
    const querySnapshot = await getDocs(q);
    const posts: Post[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      posts.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        publishedAt: data.publishedAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Post);
    });
    
    return posts;
  } catch (error) {
    console.error("Error fetching trending posts:", error);
    return [];
  }
};