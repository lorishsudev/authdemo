import { prisma } from "../../libs/prismadb";
import { NextResponse } from 'next/server';


export const GET = async () => {
  try {
    const mission_data = await prisma.mission_Data.findMany({
      include: {
        missions: true, // 這裡關聯 `missions`
      },
    });

    return NextResponse.json(mission_data);
  } catch (error) {
    console.error("Error fetching mission data:", error);
    return NextResponse.json({ error: "Failed to fetch mission data" }, { status: 500 });
  }
};