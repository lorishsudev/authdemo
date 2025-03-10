import { prisma } from "../../../libs/prismadb";
import { NextResponse } from 'next/server';


export const GET = async (req, { params }) => {

    const { id } = params;

    const missions = await prisma.missions.findUnique({
        where: {
            id
        }
    });

    return NextResponse.json(missions);

};