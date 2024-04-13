"use client";

import { Plus } from "lucide-react";

import type { User } from "@prisma/client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";

import useCreateOfficierModal from "@/hooks/useCreateOfficerModal";

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
