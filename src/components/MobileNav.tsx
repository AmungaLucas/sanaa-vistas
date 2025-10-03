/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import UserAvatar from "@/components/UserAvatar";
import { UserProfile } from "@/lib/userProfile";

const MobileNav = ({
  isMenuOpen,
  navigation,
  searchQuery,
  setSearchQuery,
  user,
  userProfile,
  handleSignOut,
}: any) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  if (!isMenuOpen) return null;

  return (
    <div className="md:hidden py-4 space-y-4">
      {/* Search */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 w-full font-lora border rounded-md px-2 py-1"
        />
      </div>

      {/* Links */}
      {navigation.map((item: any) => (
        <Link
          key={item.name}
          to={item.href}
          className={`block font-poppins font-medium py-2 transition-colors ${
            isActive(item.href)
              ? "text-primary border-l-4 border-primary pl-4"
              : "text-foreground/80 hover:text-primary pl-4"
          }`}
        >
          {item.name}
        </Link>
      ))}

      {/* Auth */}
      <div className="pt-4 border-t border-border">
        {user ? (
          <div className="space-y-2 px-4">
            <div className="flex items-center gap-2">
              <UserAvatar
                photoURL={user.photoURL}
                displayName={userProfile?.username || user.displayName}
                size="sm"
              />
              <p className="text-sm text-muted-foreground font-poppins">
                {userProfile?.username || user.displayName || user.email}
              </p>
            </div>
            <Button
              onClick={handleSignOut}
              variant="destructive"
              size="sm"
              className="w-full font-poppins"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="px-4">
            <Button asChild className="w-full font-poppins" size="sm">
              <Link to="/auth">Sign In</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileNav;
