import { fetchWithAuth } from "@/app/libs/helper";

export async function GET(request: Request,  { params }: { params: { uuid: string } }) {
    const data = await fetchWithAuth(`/rooms/${params.uuid}/users`);
    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });
}
