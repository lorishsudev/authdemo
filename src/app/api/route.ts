export async function GET() {
    const data = {id: 1, name: 'John Doe'};

    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}