import { fetchPublicRoute } from "@/app/libs/helper";

export async function GET(request: Request) {

  const query = new URL(request.url).searchParams;
  const token = query.get('token');

  try {
    const data = await fetchPublicRoute(`/auth/activate/${token}`);
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({
      success: false,
      message: error.message
    }))
  }
}
