import { fetchWithAuth } from "@/app/libs/helper";

export async function POST(request: Request) {
  const body = await request.json()
  try {
    const data = await fetchWithAuth(`/rooms/`, {
      body: JSON.stringify(body),
      method: 'POST'
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
