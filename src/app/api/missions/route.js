import { prisma } from "../../libs/prismadb";
import { ResponseHandler } from "../../utils/ResponseHandler";

// export const GET = async () => {
//     try {
//         const missions = await prisma.missions.findMany();

//         if (!missions) {
//             return ResponseHandler.error(null, "Missions not found", 404);
//         }

//         return ResponseHandler.success(missions);
//     } catch (err) {

//         return ResponseHandler.error(err, "GET Error", 500);

//     }
// }

export const GET = async (request) => {
    try {
        // 使用 request.nextUrl.searchParams 獲取查詢參數
        const { searchParams } = request.nextUrl;

        // 獲取查詢參數
        const id = searchParams.get('id');
        const mission_type = searchParams.get('mission_type');
        const status = searchParams.get('status');

        // 動態組建查詢條件
        const queryConditions = {};
        if (id) {
            queryConditions.id = id;
        }
        if (mission_type) {
            queryConditions.mission_type = mission_type;
        }
        if (status) {
            queryConditions.status = status;
        }

         // 如果沒有提供任何查詢參數，則返回所有任務
         const missions = await prisma.missions.findMany({
            where: Object.keys(queryConditions).length ? queryConditions : undefined
        });

        if (missions.length === 0) {
            return ResponseHandler.error(null, "No missions found", 404);
        }

        return ResponseHandler.success(missions);
    } catch (err) {
        return ResponseHandler.error(err, "GET Error", 500);
    }
};

export const POST = async (request) => {
    try {
        const body = await request.json();
        const mission = await prisma.missions.create({ data: body });

        return ResponseHandler.success(mission);
    } catch (err) {
        return ResponseHandler.error(err, "POST Error", 500);
    }
}
