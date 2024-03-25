"use client";

import { User, columns } from "./columns";
import { DataTable } from "./data-table";
import { BsPlusSquare } from "react-icons/bs";
import { Button } from "@/components/ui/button";

import useCreateOfficierModal from "@/hooks/useCreateOfficerModal";

export default function OfficiersTable({ data }: { data: User[] }) {
  const { onOpen } = useCreateOfficierModal();
  return (
    <div className="w-full py-10">
      <Button variant="ghost" className="flex gap-x-2" onClick={onOpen}>
        <span>اضافة</span>
        <BsPlusSquare />
      </Button>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
