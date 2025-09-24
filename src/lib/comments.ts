import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  where,
  Timestamp 
} from "firebase/firestore";
import { db } from "./firebaseConfig";

export interface Comment {
  id: string;
  approved: boolean;
  authorName: string;
  content: string;
  createdAt: Date;
  postId: string;
  userId: string;
}

export const getComments = async (postId: string): Promise<Comment[]> => {
  try {
    const commentsRef = collection(db, "posts", postId, "comments");
    const q = query(
      commentsRef,
      where("approved", "==", true),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const comments: Comment[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      comments.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
      } as Comment);
    });
    
    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

export const addComment = async (
  postId: string,
  authorName: string,
  content: string,
  userId: string = "anonymous"
): Promise<boolean> => {
  try {
    const commentsRef = collection(db, "posts", postId, "comments");
    
    await addDoc(commentsRef, {
      approved: false, // Comments need approval by default
      authorName,
      content,
      createdAt: Timestamp.now(),
      postId,
      userId
    });
    
    return true;
  } catch (error) {
    console.error("Error adding comment:", error);
    return false;
  }
};