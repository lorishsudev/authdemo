import { prisma } from "../../libs/prismadb";
import { NextResponse } from 'next/server';


export const GET = async () => {
  const missions = await prisma.missions.findMany();

  return NextResponse.json(missions);

};