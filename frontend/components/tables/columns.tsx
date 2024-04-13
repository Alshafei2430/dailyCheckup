"use client";

import { HiOutlinePencilAlt } from "react-icons/hi";

import { differenceInCalendarDays, format } from "date-fns";
import { ar } from "date-fns/locale";

import type { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import useUpdateOfficerModal from "@/hooks/useUpdateOfficerModal";

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
      const lastArrivalDay = format(lastArrivalDate, "EEEE", { locale: ar });
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
      const { onOpen, isOpen, setOfficer } = useUpdateOfficerModal();
      const openUpdateModal = () => {
        const currentUser = {
          id: row.getValue("id"),
          rank: row.getValue("rank"),
          name: row.getValue("name"),
          militaryUnit: row.getValue("militaryUnit"),
          status: row.getValue("status"),
          lastArrivalDate: row.getValue("lastArrivalDate"),
        } as User;
        console.log({ currentUser });
        setOfficer(currentUser);
        onOpen();
      };
      return (
        <Button className="flex gap-x-2" onClick={openUpdateModal}>
          <span>تعديل</span>
          <HiOutlinePencilAlt />
        </Button>
      );
    },
  },
];
