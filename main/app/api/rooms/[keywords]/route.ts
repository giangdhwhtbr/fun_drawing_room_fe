import { fetchWithAuth } from "@/app/libs/helper";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const keywords = url.pathname.split('/').pop();
    const data = await fetchWithAuth(`/rooms/search/${keywords}`);
    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });
}
