import { fetchWithAuth } from "@/app/libs/helper";

export async function GET(request: Request,  { params }: { params: { id: number } }) {
  try {
    const data = await fetchWithAuth(`/rooms/join/${params.id}`, {
      method: 'GET'
    });
    return new Response(JSON.stringify({
      success: true,
      data
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error(error)
    return new Response(JSON.stringify({
      success: false,
      message: error.message
    }))
  }
}
