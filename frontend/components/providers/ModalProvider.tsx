"use client";

import { useEffect, useState } from "react";
import { UpdateOfficierModal } from "@/components/UpdateOfficierModal";
import { CreateOfficierModal } from "../CreateOfficierModal";
import useUpdateOfficerModal from "@/hooks/useUpdateOfficerModal";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);
  const { officerId } = useUpdateOfficerModal();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <UpdateOfficierModal officierId={officerId} />
      <CreateOfficierModal />
    </>
  );
}
