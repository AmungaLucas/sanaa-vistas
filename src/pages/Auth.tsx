/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/lib/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { createUserProfile, getUserProfile } from "@/lib/userProfile";
import AuthLayout from "@/components/AuthLayout";
import AuthForm from "@/components/AuthForm";
import SocialAuth from "@/components/SocialAuth";
import AuthToggle from "@/components/AuthToggle";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (
    email: string,
    password: string,
    username?: string
  ) => {
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        const finalUsername = username?.trim() || email.split("@")[0];
        await updateProfile(user, { displayName: finalUsername });
        await createUserProfile(
          user.uid,
          email,
          finalUsername,
          user.photoURL || undefined,
          finalUsername
        );
        toast({
          title: "Account created!",
          description: "Welcome to Sanaa Scope.",
        });
      }
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Authentication failed.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Always take latest Google info
      const displayName =
        user.displayName || user.email?.split("@")[0] || "User";
      const username = user.email?.split("@")[0] || "user";
      const photoURL = user.photoURL || "/default-avatar.png";

      // Update Firebase Auth profile (ensures UI consistency)
      await updateProfile(user, {
        displayName,
        photoURL,
      });

      // Always overwrite Firestore profile
      await createUserProfile(
        user.uid,
        user.email || "",
        displayName,
        photoURL,
        username
      );

      toast({ title: "Success!", description: "Signed in with Google." });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Google sign-in failed.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title={isLogin ? "Login | Sanaa Scope" : "Sign Up | Sanaa Scope"}
      description={
        isLogin
          ? "Sign in to your Sanaa Scope account"
          : "Create a new Sanaa Scope account"
      }
    >
      <div className="text-center mb-8">
        <h1 className="font-poppins font-bold text-3xl text-heading mb-2">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-muted-foreground text-sm">
          {isLogin
            ? "Sign in to continue to Sanaa Scope"
            : "Join our creative community"}
        </p>
      </div>

      <AuthForm isLogin={isLogin} loading={loading} onSubmit={handleSubmit} />
      <SocialAuth onGoogleSignIn={handleGoogleSignIn} loading={loading} />
      <AuthToggle isLogin={isLogin} toggle={() => setIsLogin(!isLogin)} />
    </AuthLayout>
  );
};

export default Auth;
