"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import useCreateOfficierModal from "@/hooks/useCreateOfficerModal";
import type { User } from "@prisma/client";

export default function OfficiersTable({ data }: { data: User[] }) {
  const { onOpen } = useCreateOfficierModal();
  return (
    <div className="w-full py-10 text-lg">
      <Button className="flex gap-x-2 text-white mb-2" onClick={onOpen}>
        اضافة
        <Plus />
      </Button>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
