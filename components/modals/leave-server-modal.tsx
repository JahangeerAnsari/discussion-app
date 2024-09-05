"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";

import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { useStoreModal } from "@/hooks/use-modal-store";
import toast from "react-hot-toast";

const LeaveServerModal = () => {
  const { isOpen, onClose, data, type } = useStoreModal();
  const isModalOpen = isOpen && type === "leaveServer";
  const router = useRouter();
  const { server } = data;
  const [isLoading, setIsLoading] = useState(false);
  const handleCloseModal = () => {
    onClose();
  };
  const handleDeleteServer = async () => {
    try {
      setIsLoading(true);

      const res = await axios.patch(`/api/servers/${server?.id}/leave`);
      console.log("res");

      if (res) {
        onClose();
        router.refresh();
        router.push("/");
        router.refresh();
      }
      toast.success(`Member Leave  from ${server.name}`);
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Leave Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you want to leave{" "}
            <span className="font-semibold text-indigo-500">
              {server?.name}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button
              disabled={isLoading}
              onClick={handleCloseModal}
              variant="ghost"
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              variant="primary"
              onClick={() => handleDeleteServer()}
            >
              Yes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveServerModal;
