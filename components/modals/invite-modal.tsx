"use client";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { useStoreModal } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrentOrigin } from "@/hooks/currnet-origin";
const InviteModal = () => {
  const { isOpen, onClose, type, data } = useStoreModal();
  const {server} =data
  const isModalOpen = isOpen && type === "inviteServer";
  const origin = useCurrentOrigin();
  const [inviteCode, setInviteCode] = useState("");
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Invite People
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label
            className="uppercase text-xs font-bold text-zinc-500 
          dark:text-secondary/70
          "
          >
            Server Invite Link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              className="bg-zinc-300/50 border-0
                     focus-visible:ring-0 text-black 
                     focus-visible:ring-offset-0
                     "
              value={inviteUrl}
            />
            <Button size="icon">
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <Button
            variant="link"
            size="sm"
            className="text-xs text-zinc-500 mt-4"
          >
            Generate new links
            <RefreshCw className="h-4 w-4 ml-3" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
