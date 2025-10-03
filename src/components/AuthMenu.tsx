import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings } from "lucide-react";
import UserAvatar from "@/components/UserAvatar";
import { UserProfile } from "@/lib/userProfile";

const AuthMenu = ({
  user,
  userProfile,
  handleSignOut,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  userProfile: UserProfile | null;
  handleSignOut: () => void;
}) => {
  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <UserAvatar
            photoURL={user.photoURL}
            displayName={userProfile?.username || user.displayName}
            size="sm"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="font-poppins">
          {userProfile?.username || user.displayName || user.email}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="font-poppins">
          <Link to="/settings">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleSignOut}
          className="font-poppins text-destructive"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button asChild variant="default" size="sm">
      <Link to="/auth" className="font-poppins">
        Sign In
      </Link>
    </Button>
  );
};

export default AuthMenu;
