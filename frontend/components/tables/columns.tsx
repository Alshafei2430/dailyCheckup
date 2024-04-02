"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

import { HiOutlinePencilAlt } from "react-icons/hi";

import useUpdateOfficerModal from "@/hooks/useUpdateOfficerModal";
import useOfficiers from "@/hooks/useOfficiers";
import { differenceInCalendarDays, format } from "date-fns";

import type { User } from "@prisma/client";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => {
      return <span>{row.index + 1}</span>;
    },
  },
  {
    accessorKey: "rank",
    header: "الرتبة",
  },
  {
    accessorKey: "name",
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
    accessorKey: "lastArrivalDate",
    header: "آخر عودة",
    cell: ({ row }) => {
      const lastArrivalDate = row.getValue("lastArrivalDate") as Date;
      const lastArrivalDateFormatted = format(lastArrivalDate, "dd/MM");
      const lastArrivalDay = format(lastArrivalDate, "EEEE");
      return (
        <div className="flex flex-col justify-center">
          <span>{lastArrivalDay}</span>
          <span>{lastArrivalDateFormatted}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "durationSinceLastArrival",
    header: "مدة التواجد",
    cell: ({ row }) => {
      const lastArrivalDate = row.getValue("lastArrivalDate") as Date;
      const durationSinceLastArrival = differenceInCalendarDays(
        new Date(),
        lastArrivalDate
      );
      return <span>{durationSinceLastArrival}</span>;
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const { onOpen, setOfficierId } = useUpdateOfficerModal();

      const openUpdateModal = () => {
        const userId = row.getValue("id") as string;
        if (userId) {
          setOfficierId(userId);
          onOpen();
        }
      };
      return (
        <Button
          variant="ghost"
          className="flex gap-x-2"
          onClick={openUpdateModal}
        >
          <span>تعديل</span>
          <HiOutlinePencilAlt />
        </Button>
      );
    },
  },
];
