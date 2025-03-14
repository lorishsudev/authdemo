import { prisma } from "../../../libs/prismadb";
import { ResponseHandler } from "../../../utils/ResponseHandler";

export const GET = async (request, context) => {
    try {
        const { id } = (await context.params);
        const mission = await prisma.missions.findUnique({ where: { id } });

        if (!mission) {
            return ResponseHandler.error(null, "Mission not found", 404);
        }

        return ResponseHandler.success(mission);
    } catch (err) {

        return ResponseHandler.error(err, "GET Error", 500);

    }
}

export const PUT = async (request, context) => {

    try {
        const { id } = (await context.params);
        const body = await request.json();
        const mission = await prisma.missions.update({ where: { id }, data: body });

        return ResponseHandler.success(mission);
    } catch (err) {
        return ResponseHandler.error(err, "PUT Error", 500);
    }
}

export const DELETE = async (request, context) => {
    try {
        const { id } = (await context.params);
        const mission = await prisma.missions.delete({ where: { id } });

        return ResponseHandler.success(mission);
    } catch (err) {
        return ResponseHandler.error(err, "DELETE Error", 500);
    }
}
