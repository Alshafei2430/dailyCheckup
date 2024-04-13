import { User } from "@prisma/client";
import { create } from "zustand";

interface UpdateOfficerModalStore {
  isOpen: boolean;
  officer: User | null;
  onOpen: () => void;
  onClose: () => void;
  setOfficer: (officer: User) => void;
}

const useUpdateOfficerModal = create<UpdateOfficerModalStore>((set) => ({
  isOpen: false,
  officer: null,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setOfficer: (officer) => set({ officer }),
}));

export default useUpdateOfficerModal;
