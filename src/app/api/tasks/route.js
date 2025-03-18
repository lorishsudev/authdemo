import { prisma } from "../../libs/prismadb";
import { ResponseHandler } from "../../utils/ResponseHandler";

export const GET = async (request) => {
    try {
        // 使用 request.nextUrl.searchParams 獲取查詢參數
        const { searchParams } = request.nextUrl;

        // 獲取查詢參數
        const id = searchParams.get('id');
        const mission_id = searchParams.get('mission_id');
        

        // 動態組建查詢條件
        const queryConditions = {};
        if (id) {
            queryConditions.id = id;
        }
        if (mission_id) {
            queryConditions.mission_id = mission_id;
        }


         // 如果沒有提供任何查詢參數，則返回所有任務
         const task = await prisma.tasks.findMany({
            include: {
                mission: true, // 這裡關聯 `missions`
              },
            where: Object.keys(queryConditions).length ? queryConditions : undefined
        });

        if (task.length === 0) {
            return ResponseHandler.error(null, "No tasks found", 404);
        }

        return ResponseHandler.success(task);
    } catch (err) {
        return ResponseHandler.error(err, "GET Error", 500);
    }
};

export const POST = async (request) => {
    try {
        const body = await request.json();
        const task = await prisma.tasks.create({ data: body });

        return ResponseHandler.success(task);
    } catch (err) {
        return ResponseHandler.error(err, "POST Error", 500);
    }
}
