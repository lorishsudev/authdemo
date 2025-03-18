import { prisma } from "../../libs/prismadb";
import { ResponseHandler } from "../../utils/ResponseHandler";

export const GET = async (request) => {
    try {
        // 使用 request.nextUrl.searchParams 獲取查詢參數
        const { searchParams } = request.nextUrl;

        // 獲取查詢參數
        const id = searchParams.get('id');
        const mission_id = searchParams.get('mission_id');
        const player_id = searchParams.get('player_id');

        // 動態組建查詢條件
        const queryConditions = {};
        if (id) {
            queryConditions.id = id;
        }
        if (mission_id) {
            queryConditions.mission_id = mission_id;
        }
        if (player_id) {
            queryConditions.player_id = player_id;
        }


        // 如果沒有提供任何查詢參數，則返回所有任務
        const mission_data = await prisma.mission_Data.findMany({
            include: {
                mission: true
            },
            where: Object.keys(queryConditions).length ? queryConditions : undefined
        });

        if (mission_data.length === 0) {
            return ResponseHandler.error(null, "No mission_data found", 404);
        }

        return ResponseHandler.success(mission_data);
    } catch (err) {
        return ResponseHandler.error(err, "GET Error", 500);
    }
};

export const POST = async (request) => {
    try {
        const body = await request.json();
        const mission_data = await prisma.mission_Data.create({ data: body });

        return ResponseHandler.success(mission_data);
    } catch (err) {
        return ResponseHandler.error(err, "POST Error", 500);
    }
}
