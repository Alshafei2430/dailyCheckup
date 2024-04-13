"use client";

import useUpdateOfficerModal from "@/hooks/useUpdateOfficerModal";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { UpdateOfficierForm } from "./UpdateOfficerForm";

export function UpdateOfficierModal() {
  const { isOpen, onClose, officer } = useUpdateOfficerModal();

  if (!officer) {
    return;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            تعديل بيانات الضابط
          </DialogTitle>
        </DialogHeader>
        <UpdateOfficierForm officer={officer} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
