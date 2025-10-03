/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "@/lib/firebaseConfig";
import {
  updateProfile,
  updateEmail,
  linkWithPopup,
  unlink,
} from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { getUserProfile, createUserProfile } from "@/lib/userProfile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "@/components/UserAvatar";
import SEO from "@/components/SEO";
import { Loader2, Link as LinkIcon, Unlink } from "lucide-react";

const Settings = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [linkLoading, setLinkLoading] = useState(false);
  const [hasGoogleLinked, setHasGoogleLinked] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) {
        navigate("/auth");
        return;
      }

      setUser(currentUser);
      setDisplayName(currentUser.displayName || "");
      setEmail(currentUser.email || "");

      // Check if Google is linked
      const googleProvider = currentUser.providerData.find(
        (p) => p.providerId === "google.com"
      );
      setHasGoogleLinked(!!googleProvider);

      // Get username from Firestore
      const profile = await getUserProfile(currentUser.uid);
      if (profile) {
        setUsername(profile.username || "");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // Update Firebase Auth profile
      await updateProfile(user, {
        displayName: displayName || user.displayName,
      });

      // Update email if changed
      if (email !== user.email && email) {
        await updateEmail(user, email);
      }

      // Update Firestore profile
      await createUserProfile(
        user.uid,
        email || user.email || "",
        displayName || user.displayName || "",
        user.photoURL || undefined,
        username || displayName || user.displayName || ""
      );

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });

      // Refresh user data
      await user.reload();
      setUser(auth.currentUser);
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

  const handleLinkGoogle = async () => {
    if (!user) return;

    setLinkLoading(true);
    try {
      const result = await linkWithPopup(user, googleProvider);
      
      // Update profile with Google info if available
      if (result.user.photoURL) {
        await updateProfile(user, {
          photoURL: result.user.photoURL,
        });
      }

      setHasGoogleLinked(true);
      toast({
        title: "Google account linked",
        description: "You can now sign in with Google.",
      });

      // Refresh user data
      await user.reload();
      setUser(auth.currentUser);
    } catch (error: any) {
      if (error.code === "auth/credential-already-in-use") {
        toast({
          title: "Account already exists",
          description: "This Google account is already linked to another user.",
          variant: "destructive",
        });
      } else if (error.code === "auth/provider-already-linked") {
        toast({
          title: "Already linked",
          description: "This provider is already linked to your account.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: error.message || "Failed to link Google account.",
          variant: "destructive",
        });
      }
    } finally {
      setLinkLoading(false);
    }
  };

  const handleUnlinkGoogle = async () => {
    if (!user) return;

    // Prevent unlinking if it's the only provider
    if (user.providerData.length <= 1) {
      toast({
        title: "Cannot unlink",
        description: "You must have at least one sign-in method.",
        variant: "destructive",
      });
      return;
    }

    setLinkLoading(true);
    try {
      await unlink(user, "google.com");
      setHasGoogleLinked(false);
      toast({
        title: "Google account unlinked",
        description: "Your Google account has been unlinked.",
      });

      // Refresh user data
      await user.reload();
      setUser(auth.currentUser);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to unlink Google account.",
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
        <div className="mb-8">
          <h1 className="font-poppins font-bold text-4xl text-heading mb-2">
            Profile Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account information and linked providers
          </p>
        </div>

        <div className="grid gap-6">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle className="font-poppins">Profile Information</CardTitle>
              <CardDescription>
                Update your profile details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 mb-6">
                <UserAvatar
                  photoURL={user.photoURL}
                  displayName={displayName || user.displayName}
                  size="lg"
                />
                <div>
                  <p className="font-semibold text-lg">{displayName || user.displayName}</p>
                  <p className="text-sm text-muted-foreground">{email || user.email}</p>
                </div>
              </div>

              <Separator className="my-6" />

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter your display name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                  <p className="text-xs text-muted-foreground">
                    Changing your email will require verification
                  </p>
                </div>

                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Linked Accounts */}
          <Card>
            <CardHeader>
              <CardTitle className="font-poppins">Linked Accounts</CardTitle>
              <CardDescription>
                Manage your connected authentication providers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Email/Password Provider */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg">✉️</span>
                    </div>
                    <div>
                      <p className="font-medium">Email & Password</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">Primary</span>
                </div>

                {/* Google Provider */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Google</p>
                      <p className="text-sm text-muted-foreground">
                        {hasGoogleLinked ? "Connected" : "Not connected"}
                      </p>
                    </div>
                  </div>
                  {hasGoogleLinked ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleUnlinkGoogle}
                      disabled={linkLoading}
                    >
                      {linkLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Unlink className="h-4 w-4 mr-2" />
                          Unlink
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLinkGoogle}
                      disabled={linkLoading}
                    >
                      {linkLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <LinkIcon className="h-4 w-4 mr-2" />
                          Link Account
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Settings;
