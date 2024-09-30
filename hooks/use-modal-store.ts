import { Channel, ChannelType, Server } from "@prisma/client";
import { create } from "zustand";
export type ModalTypes =
  | "createServer"
  | "inviteServer"
  | "editServer"
  | "members"
  | "createChannel"
  | "leaveServer"
  | "deleteServer" |"deleteChannel" |
  "editChannel" | "messageFile";

interface ModalData {
  server?: Server;
  channel?:Channel;
  channelType?:ChannelType;
  apiUrl?: string;
  query?:Record<string, any>;
}
interface UseStoreModalProps {
  type: ModalTypes | null;
  isOpen: boolean;
  data: ModalData;
  onOpen: (type: ModalTypes, data?: ModalData) => void;
  onClose: () => void;
}
export const useStoreModal = create<UseStoreModalProps>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null }),
}));
