import { Server } from "@prisma/client";
import { create } from "zustand";
export type ModalTypes = "createServer" | "inviteServer" | "editServer" ;
interface ModalData {
  server?: Server;
}
interface UseStoreModalProps {
  type: ModalTypes | null;
  isOpen: boolean;
  data:ModalData;
  onOpen: (type: ModalTypes, data?: ModalData) => void;
  onClose: () => void;
}
export const useStoreModal = create<UseStoreModalProps>((set) => ({
  type: null,
  data:{},
  isOpen: false,
  onOpen: (type,data={}) => set({ isOpen: true, type,data }),
  onClose: () => set({ isOpen: false, type: null }),
}));
