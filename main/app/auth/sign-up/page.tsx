'use client';

import SignUpForm from "@/components/SignUpForm";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// `app/page.tsx` is the UI for the `/` URL
export default function Page() {
  const router = useRouter();

  const handleSignUp = async (data: any) => {
    const response = await fetch('/api/auth/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json(); 
    if (result.success) {
      router.push('/auth/sign-in');
    } else {
      toast.error(result.message ? result.message : 'Sign up failed');
    }
  }

  return <SignUpForm handleSignUp={handleSignUp}/>;
}
