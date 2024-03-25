"use client";

import { useEffect, useState } from "react";
import { UpdateOfficierModal } from "@/components/UpdateOfficierModal";
import { CreateOfficierModal } from "../CreateOfficierModal";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <UpdateOfficierModal />
      <CreateOfficierModal />
    </>
  );
}
