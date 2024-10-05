import { deleteSession } from "@/app/libs/session";

export async function GET(request: Request) {
    deleteSession();
}