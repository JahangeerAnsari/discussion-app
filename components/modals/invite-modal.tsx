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
const InviteModal = () => {
  const { isOpen, onClose, type  } = useStoreModal();
  const isModalOpen = isOpen && type === "inviteServer";
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
          <Label>Server Invite Link</Label>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
