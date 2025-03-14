import { prisma } from "../../../libs/prismadb";
import { NextResponse } from 'next/server';


export const GET = async (_, props) => {
    const params = await props.params;

    const { id } = params;

    const mission_data = await prisma.mission_Data.findUnique({
        where: {
            id
        },
        include: {
            missions: true,  // 關聯 missions 資料
        },
    });

    return NextResponse.json(mission_data);
};