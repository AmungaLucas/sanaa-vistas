/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, db } from "@/lib/firebaseConfig";
import {
  updateProfile,
  updateEmail,
  updatePassword,
  deleteUser,
  reauthenticateWithCredential,
  linkWithCredential,
  unlink,
  GoogleAuthProvider,
  EmailAuthProvider,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

import { useToast } from "@/hooks/use-toast";
import { createUserProfile } from "@/lib/userProfile";
import SEO from "@/components/SEO";
import { Loader2 } from "lucide-react";
import ProfileForm from "@/components/ProfileForm";
import EmailVerification from "@/components/EmailVerification";
import LinkedAccounts from "@/components/LinkedAccounts";
import ChangePassword from "@/components/ChangePassword";
import DangerZone from "@/components/DangerZone";

const Settings = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // linking
  const [newPassword, setNewPassword] = useState(""); // updating
  const [loading, setLoading] = useState(false);
  const [linkLoading, setLinkLoading] = useState(false);
  const [providers, setProviders] = useState<string[]>([]);
  const [emailVerified, setEmailVerified] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const isEmailLinked = providers.includes("password");
  const isGoogleLinked = providers.includes("google.com");

  // --- AUTH STATE ---
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) {
        navigate("/auth");
        return;
      }

      setUser(currentUser);
      setDisplayName(currentUser.displayName || "");
      setEmail(currentUser.email || "");
      setEmailVerified(currentUser.emailVerified);
      setProviders(currentUser.providerData.map((p) => p.providerId));

      const profileRef = doc(db, "users", currentUser.uid);
      const unsubscribeProfile = onSnapshot(profileRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUsername(data.username || "");
        }
      });

      return () => unsubscribeProfile();
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  // --- AUTO EMAIL REFRESH ---
  useEffect(() => {
    if (!user || emailVerified) return;

    const interval = setInterval(async () => {
      await user.reload();
      if (auth.currentUser?.emailVerified) {
        setEmailVerified(true);
        clearInterval(interval);
        toast({
          title: "Email verified 🎉",
          description: "Your email address is now verified.",
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [user, emailVerified, toast]);

  // --- REAUTH ---
  const reauthenticate = async () => {
    if (!user) return false;
    try {
      if (isEmailLinked) {
        const pwd = prompt("Please re-enter your password:");
        if (!pwd) return false;
        const credential = EmailAuthProvider.credential(user.email!, pwd);
        await reauthenticateWithCredential(user, credential);
      } else if (isGoogleLinked) {
        const result = await signInWithPopup(auth, googleProvider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (!credential) throw new Error("No Google credential found");
        await reauthenticateWithCredential(user, credential);
      } else {
        throw new Error("No available provider for reauthentication");
      }
      return true;
    } catch (error: any) {
      toast({
        title: "Reauthentication failed",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  // --- HANDLERS ---
  const handleSendVerification = async () => {
    if (!user) return;
    try {
      await sendEmailVerification(user);
      toast({
        title: "Verification email sent",
        description: "Check your inbox for the verification link.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send verification email.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    try {
      await updateProfile(user, {
        displayName: displayName || user.displayName,
      });
      if (email !== user.email && email) {
        const ok = await reauthenticate();
        if (!ok) return;
        await updateEmail(user, email);
      }

      await createUserProfile(
        user.uid,
        email || user.email || "",
        displayName || user.displayName || "",
        user.photoURL || undefined,
        username || displayName || user.displayName || ""
      );

      toast({
        title: "Profile updated",
        description: "Profile updated successfully.",
      });
      await user.reload();
      setUser(auth.currentUser);
      setEmailVerified(auth.currentUser?.emailVerified || false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!user || !newPassword) return;
    try {
      const ok = await reauthenticate();
      if (!ok) return;
      await updatePassword(user, newPassword);
      toast({
        title: "Password updated",
        description: "Your password has been changed.",
      });
      setNewPassword("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update password.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    const confirm = window.confirm(
      "Are you sure you want to delete your account? This cannot be undone."
    );
    if (!confirm) return;
    try {
      const ok = await reauthenticate();
      if (!ok) return;
      await deleteUser(user);
      toast({
        title: "Account deleted",
        description: "Your account has been removed.",
      });
      navigate("/auth");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleLinkGoogle = async () => {
    if (!user) return;
    setLinkLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (!credential) throw new Error("Failed to get Google credential");
      await linkWithCredential(user, credential);
      toast({
        title: "Google linked",
        description: "Now you can sign in with Google.",
      });
      await user.reload();
      setUser(auth.currentUser);
      setProviders(
        auth.currentUser?.providerData.map((p) => p.providerId) || []
      );
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLinkLoading(false);
    }
  };

  const handleLinkEmailPassword = async (email: string, password: string) => {
    if (!user) return;
    setLinkLoading(true);
    try {
      const credential = EmailAuthProvider.credential(email, password);
      await linkWithCredential(user, credential);
      toast({
        title: "Email linked",
        description: "Now you can sign in with email/password.",
      });
      await user.reload();
      setUser(auth.currentUser);
      setProviders(
        auth.currentUser?.providerData.map((p) => p.providerId) || []
      );
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLinkLoading(false);
    }
  };

  const handleUnlinkGoogle = async () => {
    if (!user) return;
    if (user.providerData.length <= 1) {
      toast({
        title: "Cannot unlink",
        description: "You need at least one login method.",
        variant: "destructive",
      });
      return;
    }
    setLinkLoading(true);
    try {
      await unlink(user, "google.com");
      toast({ title: "Google unlinked", description: "Google login removed." });
      await user.reload();
      setUser(auth.currentUser);
      setProviders(
        auth.currentUser?.providerData.map((p) => p.providerId) || []
      );
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLinkLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Profile Settings | Sanaa Scope"
        description="Manage your Sanaa Scope profile and account settings"
        keywords="profile, settings, account, Sanaa Scope"
        url={`${window.location.origin}/settings`}
        image="/placeholder.svg"
      />

      <div className="container max-w-4xl mx-auto py-12 px-4">
        <h1 className="font-bold text-4xl mb-6">Profile Settings</h1>

        <div className="grid gap-6">
          <ProfileForm
            displayName={displayName}
            setDisplayName={setDisplayName}
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            loading={loading}
            handleUpdateProfile={handleUpdateProfile}
          />

          <EmailVerification
            emailVerified={emailVerified}
            handleSendVerification={handleSendVerification}
          />

          <LinkedAccounts
            isEmailLinked={isEmailLinked}
            isGoogleLinked={isGoogleLinked}
            email={email}
            password={password}
            setPassword={setPassword}
            linkLoading={linkLoading}
            handleLinkEmailPassword={handleLinkEmailPassword}
            handleLinkGoogle={handleLinkGoogle}
            handleUnlinkGoogle={handleUnlinkGoogle}
          />

          {isEmailLinked && (
            <ChangePassword
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              handleChangePassword={handleChangePassword}
            />
          )}

          <DangerZone handleDeleteAccount={handleDeleteAccount} />
        </div>
      </div>
    </>
  );
};

export default Settings;
