import { fetchWithAuth } from "@/app/libs/helper";

export async function GET(request: Request,  { params }: { params: { keywords: string } }) {
    const data = await fetchWithAuth(`/rooms/search/${params.keywords}`);
    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });
}
