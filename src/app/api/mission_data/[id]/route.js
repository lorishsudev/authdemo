import { prisma } from "../../../libs/prismadb";
import { NextResponse } from 'next/server';


export const GET = async (_, { params }) => {

    const { id } = params;

    const mission_data = await prisma.mission_Data.findUnique({
        where: {
            id
        }
    });

    return NextResponse.json(mission_data);

};