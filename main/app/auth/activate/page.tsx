'use client'
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      router.push('/auth/sign-in');
    } else {
      fetch(`/api/auth/activate?token=${token}`).then((res) => res.json()).then((data) => {
        if (data.success) {
          router.push('/auth/sign-in');
        }
      });
    }
  },[])
  return 'Unable to activate account';
}
