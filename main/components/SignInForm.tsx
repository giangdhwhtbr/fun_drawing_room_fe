"use client";
import { signIn } from '@/app/actions/auth';
import { useFormState, useFormStatus } from 'react-dom';

const SignInForm = () => {
  const [state, action] = useFormState(signIn, undefined)
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">
      <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Fun Drawing Room
            </h3>
            <p className="">
              {`Don't have an account?`}{" "}
              <a
                href="/auth/sign-up"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
        <div className="bg-white shadow p-4 py-6 space-y-8 sm:p-6 sm:rounded-lg">
          <form action={action} className="space-y-5">
            <div>
              <label className="font-medium">Email</label>
              <input
                name="email"
                type="email"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {state?.errors?.email && (
                <p role="alert" className='text-red-500'>{state?.errors?.email}</p>
              )}
            </div>
            <div>
              <label className="font-medium">Password</label>
              <input
                name="password"
                type="password"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {state?.errors?.password && (
                <p role="alert" className='text-red-500'>{state?.errors?.password}</p>
              )}
            </div>
            {state?.message && (
              <p role="alert" className='text-red-500'>{state.message}</p>
            )}
            <SubmitButton/>
          </form>
        </div>
        <div className="text-center">
          <a href="/auth/forgot-password" className="hover:text-indigo-600">
            Forgot password?
          </a>
        </div>
      </div>
    </main>
  );
};

function SubmitButton() {
  const { pending } = useFormStatus()
 
  return (
    <button disabled={pending} type="submit" className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
      Sign In
    </button>
  )
}

export default SignInForm;
