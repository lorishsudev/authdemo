import { prisma } from "../../libs/prismadb";
import { ResponseHandler } from "../../utils/ResponseHandler";

export const GET = async () => {
    try {
        const missions = await prisma.missions.findMany();

        if (!missions) {
            return ResponseHandler.error(null, "Missions not found", 404);
        }

        return ResponseHandler.success(missions);
    } catch (err) {

        return ResponseHandler.error(err, "GET Error", 500);

    }
}

export const POST = async (request) => {
    try {
        const body = await request.json();
        const mission = await prisma.missions.create({ data: body });

        return ResponseHandler.success(mission);
    } catch (err) {
        return ResponseHandler.error(err, "POST Error", 500);
    }
}
