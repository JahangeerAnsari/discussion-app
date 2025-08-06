"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string;
  className?: string;
}
const UserAvatar = ({ src ,className}: UserAvatarProps) => {
  return (
    <Avatar className={cn("h-6 md:h-6 md:w-6",className)}>
      <AvatarImage src={src} alt="profile" />
      
    </Avatar>
  );
};

export default UserAvatar;
