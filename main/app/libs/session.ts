import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
 
export async function createSession(token: string) {
  cookies().set('Authorization', token, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  })
}

 
export function deleteSession() {
  cookies().delete('Authorization')
  redirect('/auth/sign-in')
}