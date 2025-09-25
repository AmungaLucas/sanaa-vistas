import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export interface User {
  uid: string;
  about: string;
  profilePic: string;
}

export const getUserById = async (uid: string): Promise<User | null> => {
  try {
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      return null;
    }
    
    const data = userDoc.data();
    return {
      uid: userDoc.id,
      about: data.about || "",
      profilePic: data.profilePic || "/api/placeholder/80/80",
    } as User;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
};