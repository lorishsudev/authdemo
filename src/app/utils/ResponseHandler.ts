// utils/ResponseHandler.ts
export class ResponseHandler {
    static success(data: any, message = "Success", status = 200) {
        return new Response(
            JSON.stringify({ status, message, data }),
            { status, headers: { "Content-Type": "application/json" } }
        );
    }

    static error(error: any, message = "Error", status = 500) {
        return new Response(
            JSON.stringify({ status, message, error: error?.message || error }),
            { status, headers: { "Content-Type": "application/json" } }
        );
    }
}
