import { prisma } from "../../../libs/prismadb";
import { NextResponse } from 'next/server';


export const GET = async (_, { params }) => {

    const { id } = params;

    const missions = await prisma.Missions.findUnique({
        where: {
            id
        }
    });

    return NextResponse.json(missions);

};