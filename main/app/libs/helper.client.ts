import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { API_BASE_URL } from "../constants";

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
    const token = cookies().get("Authorization")?.value;
    let redirectUrl;
    const defaultOptions: RequestInit = {
        credentials: "include",
        headers: {
            Authorization: token || "",
            "Content-Type": "application/json",
        },
        cache: "no-cache",
    };

    try {

        const response = await fetch(`${API_BASE_URL}${url}`, {
            ...defaultOptions,
            ...options,
        });

        if ([401, 403].includes(response.status)) {
            redirectUrl = "/auth/sign-out";
            throw new Error("Unauthorized");
        }


        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message ? data.message : "Unexpected error");
        }

        return data;
    } catch (error: any) {
        if (error.message !== "Unauthorized") {
            throw error;
        }
    } finally {
        if (redirectUrl) {
            redirect(redirectUrl);
        }
    }
}
