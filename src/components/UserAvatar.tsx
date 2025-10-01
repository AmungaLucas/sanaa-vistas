import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/userProfile";

interface UserAvatarProps {
  photoURL?: string | null;
  displayName?: string | null;
  size?: "sm" | "md" | "lg";
}

const UserAvatar = ({ photoURL, displayName, size = "md" }: UserAvatarProps) => {
  const sizeClasses = {
    sm: "h-10 w-10",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  return (
    <Avatar className={sizeClasses[size]}>
      <AvatarImage src={photoURL || undefined} alt={displayName || "User"} />
      <AvatarFallback className="bg-primary text-primary-foreground">
        {getInitials(displayName)}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
