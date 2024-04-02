import { NextResponse } from "next/server";

import { db } from "@/db";

export async function POST(req: Request) {
  try {
    const {
      rank,
      rankType,
      name,
      militaryUnit,
      status,
      lastArrivalDate,
      specialization,
      departure,
    } = await req.json();
    const chapter = await db.user.create({
      data: {
        rank,
        rankType,
        name,
        militaryUnit,
        status,
        lastArrivalDate,
        specialization,
        departure,
      },
    });

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[Users]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
