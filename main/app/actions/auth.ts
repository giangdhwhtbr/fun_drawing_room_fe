'use server'
import { API_BASE_URL } from "@/app/constants";
import { SignInFormSchema, SignInFormState } from '@/app/libs/auth.definitions';
import { redirect } from 'next/navigation';
import { createSession } from "../libs/session";

export async function signIn(state: SignInFormState, formData: FormData) {
    let redirectUrl
    try {
        const validatedFields = await SignInFormSchema.validate({
            email: formData.get('email'),
            password: formData.get('password'),
        });

        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validatedFields),
        });
        const data = await response.json()
        if (response.ok) {
            const { accessToken } = data;
            await createSession(accessToken);
           redirectUrl ='/';
        } else {
            return {
                message: 'Email or password is incorrect',
            }
        }
    } catch (error: any) {
        const resp: any = {}
        if (error.path && error.errors) {
            resp.errors = {
                [error.path]: error.errors[0]
            };
            return resp;
        }
        return {
            message: error.message,
        };
    } finally {
        if (redirectUrl) {
            redirect(redirectUrl);
        }
    }
}
