import type { User } from "@prisma/client";
import { db } from "../index";

export async function fetchOfficiers(): Promise<User[]> {
  return await db.user.findMany({
    where: {
      rankType: "ضابط",
    },
    orderBy: [
      {
        updatedAt: "desc",
      },
    ],
  });
}
