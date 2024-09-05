"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import qs from "query-string";

import { useStoreModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from "@/types/types";
import { ScrollArea } from "../ui/scroll-area";
import UserAvatar from "../user-avatar";
import { MemberRole } from "@prisma/client";
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuItem,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const roleIconMaps = {
  GUEST: null,
  MODERATOR: <Shield className="h-4 w-4 ml-2 text-indigo-500" />,
  ADMIN: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
};

const MembersModal = () => {
  const { isOpen, onClose, type, data, onOpen } = useStoreModal();
  const [loadingId, setLoadingId] = useState("");
  const router = useRouter();
  // we have only server here but we want members so we define ser
  // ServerWithMembersWithProfiles
  // extended type of server with members
  const { server } = data as { server: ServerWithMembersWithProfiles };

  const isModalOpen = isOpen && type === "members";
  const onRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
          memberId,
        },
      });
      const response = await axios.patch(url, { role });
      router.refresh();
      // now set the updated data to the modal
      onOpen("members", { server: response.data });

      toast.success("Role updated successfully");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoadingId("");
    }
  };
  const handleDeleteMember = async (memberId: string) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
          memberId,
        },
      });
      console.log("url deteted", url);

      const response = await axios.delete(url);
      router.refresh();
      onOpen("members", { server: response.data });
      toast.success(`Member deleted!`);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoadingId("");
    }
  };
  const handleCloseModal = () => {
    onClose();
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {server?.members?.length} Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 ml-3 max-h-[420px] pr-6">
          {server?.members?.map((member, i) => (
            <div className="flex items-center gap-x-2 mb-5" key={member.id}>
              <UserAvatar src={member.profile?.imageUrl} />
              <div className="flex flex-col gap-y-1">
                <div className="text-xs font-semibold flex items-center gap-x-1">
                  {member.profile.name}
                  {roleIconMaps[member.role]}
                </div>
                <p className="text-zinc-500 text-sm">{member?.profile.email}</p>
              </div>
              {/* we can only modified memeber whose role not Admin*/}
              {server.profileId !== member.profileId &&
                loadingId !== member.id && (
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="h-4 w-4 text-zinc-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="left">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="flex items-center">
                            <ShieldQuestion className="w-4 h-4 mr-2" />
                            <span>Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                onClick={() => onRoleChange(member.id, "GUEST")}
                              >
                                <Shield className="h-4 w-4 mr-2" />
                                Guest
                                {member.role === "GUEST" && (
                                  <Check className="h-4 w-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  onRoleChange(member.id, "MODERATOR")
                                }
                              >
                                <Shield className="h-4 w-4 mr-2" />
                                Moderator
                                {member.role === "MODERATOR" && (
                                  <ShieldCheck className="h-4 w-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteMember(member.id)}
                        >
                          <Gavel className="h-4 w-4 mr-2" />
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              {loadingId === member.id && (
                <Loader2 className="animate-spin text-zinc-500 ml-auto h-4 w-4" />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MembersModal;
