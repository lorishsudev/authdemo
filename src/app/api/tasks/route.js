import { prisma } from "../../libs/prismadb";
import { ResponseHandler } from "../../utils/ResponseHandler";

export const GET = async () => {
    try {
        const tasks = await prisma.Tasks.findMany();

        if (!tasks) {
            return ResponseHandler.error(null, "Missions not found", 404);
        }

        return ResponseHandler.success(tasks);
    } catch (err) {

        return ResponseHandler.error(err, "GET Error", 500);

    }
}

export const POST = async (request) => {
    try {
        const body = await request.json();
        const tasks = await prisma.Tasks.create({ data: body });

        return ResponseHandler.success(tasks);
    } catch (err) {
        return ResponseHandler.error(err, "POST Error", 500);
    }
}
