export class ResponseHandler {
    static success<T>(data: T, message = "Success", status = 200): Response {
        return new Response(
            JSON.stringify({ status, message, data }),
            { status, headers: { "Content-Type": "application/json" } }
        );
    }

    static error(error: unknown, message = "Error", status = 500): Response {
        let errorMessage = "Unknown error";

        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === "string") {
            errorMessage = error;
        }

        return new Response(
            JSON.stringify({ status, message, error: errorMessage }),
            { status, headers: { "Content-Type": "application/json" } }
        );
    }
}
