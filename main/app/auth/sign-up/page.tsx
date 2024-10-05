'use client';

import SignUpForm from "@/app/components/SignUpForm";

// `app/page.tsx` is the UI for the `/` URL
export default function Page() {

  const handleSignUp = async (data: any) => {
    console.log(data);
    const response = await fetch('/api/auth/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      console.log('Sign up successful');
    } else {
      console.error('Sign up failed');
    }
  }

  return <SignUpForm handleSignUp={handleSignUp}/>;
}


// import { FormEvent } from 'react'
// import { useRouter } from 'next/router'
 
// export default function LoginPage() {
//   const router = useRouter()
 
//   async function handleSubmit(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault()
 
//     const formData = new FormData(event.currentTarget)
//     const email = formData.get('email')
//     const password = formData.get('password')
 
//     const response = await fetch('/api/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     })
 
//     if (response.ok) {
//       router.push('/profile')
//     } else {
//       // Handle errors
//     }
//   }
 
//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="email" name="email" placeholder="Email" required />
//       <input type="password" name="password" placeholder="Password" required />
//       <button type="submit">Login</button>
//     </form>
//   )
// }