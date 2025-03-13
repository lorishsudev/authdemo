import { prisma } from "../../libs/prismadb";
import { NextResponse } from 'next/server';


export const GET = async () => {
  const missions = await prisma.missions.findMany();

  return NextResponse.json(missions);

};

export const POST = async (request) => {
  try {
    const body = await request.json();

    const newMissions = await prisma.missions.create({
        data: body  // 直接使用 body，而不是解構
    });

    return NextResponse.json(newMissions);

} catch (err) {
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
}
}

