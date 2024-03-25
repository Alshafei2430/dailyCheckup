"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

import { HiOutlinePencilAlt } from "react-icons/hi";

import useUpdateOfficerModal from "@/hooks/useUpdateOfficerModal";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
  id: string;
  rank:
    | "جندي"
    | "عريف"
    | "رقيب"
    | "رقيب أ"
    | "مساعد"
    | "مساعد أ"
    | "ملازم"
    | "ملازم أول"
    | "نقيف"
    | "رائد"
    | "مقدم"
    | "عقيد"
    | "عميد"
    | "لواء"
    | "فريق"
    | "فريق أول"
    | "مشير";
  rankType: "ضابظ" | "صف ضابط" | "جندي";
  displayName: string;
  militaryUnit: string;
  status: string;
  durationSinceLastArrival: number;
  lastArrival: Date;
  specialization: string;
  departure: Date;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "rank",
    header: "الرتبة",
  },
  {
    accessorKey: "displayName",
    header: "الاسم",
  },
  {
    accessorKey: "militaryUnit",
    header: "الوحدة",
  },

  {
    accessorKey: "status",
    header: "التمام",
  },
  {
    accessorKey: "lastArrival",
    header: "آخر عودة",
  },
  {
    accessorKey: "durationSinceLastArrival",
    header: "مدة التواجد",
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const { onOpen } = useUpdateOfficerModal();
      return (
        <Button variant="ghost" className="flex gap-x-2" onClick={onOpen}>
          <span>تعديل</span>
          <HiOutlinePencilAlt />
        </Button>
      );
    },
  },
];
