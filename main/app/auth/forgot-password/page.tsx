// `app/page.tsx` is the UI for the `/` URL
"use client";

import ForgotPasswordForm from "@/app/components/ForgotPasswordForm";

export default function Page() {
  const handleForgotPassword = async (data: any) => {
    console.log(data);
    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      console.log("Reset password request successful");
    } else {
      console.error("Failed to request password reset");
    }
  };

  return <ForgotPasswordForm handleForgotPassword={handleForgotPassword} />;
}
