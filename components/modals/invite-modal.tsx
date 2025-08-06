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
import { Check, Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrentOrigin } from "@/hooks/currnet-origin";
import axios from "axios";

const InviteModal = () => {
  const { isOpen, onClose, type, data ,onOpen} = useStoreModal();
  const {server} =data
  const isModalOpen = isOpen && type === "inviteServer";
  const origin = useCurrentOrigin();
  const [copied, setCopied] = useState(false);
  const[isLoading,setIsLoading] = useState(false)
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const handleCloseModal = () => {
    onClose();
  };
  const handleCopy = () =>{
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    // after 1 sec copy will be false
    setTimeout(() =>{
      setCopied(false);
    },1000)
  }

  const handleGenerateNewLink = async () =>{
    try {
      setIsLoading(true)
      const response =await axios.patch(`/api/servers/${server?.id}/invite-code`)
      // immediatly open the modal
      // it will update the invite code
        onOpen("inviteServer",{server:response.data})
    } catch (error:any) {
        console.log("error on generating new link",error.message);
        
    } finally{
      setIsLoading(false)
    }
  }
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
            disabled={isLoading}
              className="bg-zinc-300/50 border-0
                     focus-visible:ring-0 text-black 
                     focus-visible:ring-offset-0
                     "
              value={inviteUrl}
            />
            <Button 
            disabled={isLoading}
            size="icon" onClick={handleCopy}>
              {copied ? <Check/> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
          <Button
          disabled={isLoading}
          onClick={handleGenerateNewLink}
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
