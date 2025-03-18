import { prisma } from "../../../libs/prismadb";
import { ResponseHandler } from "../../../utils/ResponseHandler";


export const PUT = async (request, context) => {

    try {
        const { id } = (await context.params);
        const body = await request.json();
        const task = await prisma.tasks.update({ where: { id }, data: body });

        return ResponseHandler.success(task);
    } catch (err) {
        return ResponseHandler.error(err, "PUT Error", 500);
    }
}

export const DELETE = async (request, context) => {
    try {
        const { id } = (await context.params);
        const task = await prisma.tasks.delete({ where: { id } });

        return ResponseHandler.success(task);
    } catch (err) {
        return ResponseHandler.error(err, "DELETE Error", 500);
    }
}
