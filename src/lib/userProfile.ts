import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  username?: string;
  createdAt: Date;
}

export const createUserProfile = async (
  uid: string,
  email: string,
  displayName: string,
  photoURL?: string,
  username?: string
) => {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, {
    uid,
    email,
    displayName,
    photoURL: photoURL || null,
    username: username || displayName,
    createdAt: new Date(),
  });
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? (userSnap.data() as UserProfile) : null;
};

export const getInitials = (name?: string | null): string => {
  if (!name) return "U";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};
