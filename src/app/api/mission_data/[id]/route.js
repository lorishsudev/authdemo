import { prisma } from "../../../libs/prismadb";
import { ResponseHandler } from "../../../utils/ResponseHandler";


export const PUT = async (request, context) => {

    try {
        const { id } = (await context.params);
        const body = await request.json();
        const mission_data = await prisma.mission_Data.update({ where: { id }, data: body });

        return ResponseHandler.success(mission_data);
    } catch (err) {
        return ResponseHandler.error(err, "PUT Error", 500);
    }
}

export const DELETE = async (request, context) => {
    try {
        const { id } = (await context.params);
        const mission_Data = await prisma.mission_Data.delete({ where: { id } });

        return ResponseHandler.success(mission_Data);
    } catch (err) {
        return ResponseHandler.error(err, "DELETE Error", 500);
    }
}
