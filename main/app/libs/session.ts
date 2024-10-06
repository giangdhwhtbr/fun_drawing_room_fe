import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
 
export async function createSession(token: string, user: User) {
  cookies().set('Authorization', token, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  })

  cookies().set('User', JSON.stringify(user), {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
  })
}

export function getSession() {
  const token = cookies().get('Authorization')?.value
  const user = cookies().get('User')?.value
  return { token, user: user ? JSON.parse(user) : null }
}

 
export function deleteSession() {
  cookies().delete('Authorization')
  cookies().delete('User')
  redirect('/auth/sign-in')
}
