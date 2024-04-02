import { create } from "zustand";

interface UpdateOfficerModalStore {
  isOpen: boolean;
  officerId?: string;
  onOpen: () => void;
  onClose: () => void;
  setOfficierId: (id: string) => void;
}

const useUpdateOfficerModal = create<UpdateOfficerModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setOfficierId: (id: string) => set({ officerId: id }),
}));

export default useUpdateOfficerModal;
