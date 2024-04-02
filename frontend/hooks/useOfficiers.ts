import { create } from "zustand";
import type { User } from "@prisma/client";

interface OfficiersStore {
  users: User[];
  currentUser?: User;
  setOfficiers: (users: User[]) => void;
  setCurrentUser: (id: string) => void;
}

const useUpdateOfficerModal = create<OfficiersStore>((set, get) => ({
  users: [],
  setOfficiers: (users) => set((state) => ({ users })),
  setCurrentUser: (id) => {
    const user = get().users.find((user) => user.id === id);
    if (user) {
      set((state) => ({ currentUser: user }));
    }
  },
}));

export default useUpdateOfficerModal;
