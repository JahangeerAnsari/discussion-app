import {create} from 'zustand'
export type ModalTypes = "createServer"
interface UseStoreModalProps{
 type:ModalTypes | null;
 isOpen:boolean;
 onOpen:(type:ModalTypes) => void;
 onClose:() => void;
}
export const useStoreModal = create<UseStoreModalProps>((set) =>({
 type:null,
 isOpen:false,
onOpen:(type) => set({isOpen:true, type}),
onClose:() => set({isOpen:false,type:null}),
}))