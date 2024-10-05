"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ForgotPasswordFormSchema } from "../libs/auth.definitions";

type ForgotPasswordFormInputs = {
  email: string;
};

interface IForgotPasswordFormProps {
  handleForgotPassword: (data: ForgotPasswordFormInputs) => void;
}

const ForgotPasswordForm = ({
  handleForgotPassword,
}: IForgotPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInputs>({
    resolver: yupResolver(ForgotPasswordFormSchema),
    values: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormInputs> = (data) => {
    console.log(data);
    handleForgotPassword(data);
  };

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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                {...register("email")}
              />
              {errors.email?.type === "required" && (
                <p role="alert">Email is required</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            >
              Sign in
            </button>
          </form>
        </div>
        <div className="text-center">
          <a href="/auth/sign-in" className="hover:text-indigo-600">
            Try to sign in again?
          </a>
        </div>
      </div>
    </main>
  );
};

export default ForgotPasswordForm;
