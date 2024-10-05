"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignupFormSchema } from "../libs/auth.definitions";


type SignUpFormInputs = {
  name: string;
  email: string;
  password: string;
};

interface ISignUpFormProps {
  handleSignUp: (data: SignUpFormInputs) => void;
}

const SignUpForm = ({ handleSignUp }: ISignUpFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    resolver: yupResolver(
      SignupFormSchema
    ),
    values: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpFormInputs> = (data) => {
    console.log(data);
    handleSignUp(data);
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
              {`Already has an account?`}{" "}
              <a
                href="/auth/sign-in"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
        <div className="bg-white shadow p-4 py-6 space-y-8 sm:p-6 sm:rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="font-medium">Name</label>
              <input
                type="text"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                {...register("name")}
              />
              {errors.email?.type === "required" && (
                <p role="alert">Name is required</p>
              )}
            </div>
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
            <div>
              <label className="font-medium">Password</label>
              <input
                type="password"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                {...register("password")}
              />
              {errors.password?.type === "required" && (
                <p role="alert">Password is required</p>
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
          <a href="/auth/forgot-password" className="hover:text-indigo-600">
            Forgot password?
          </a>
        </div>
      </div>
    </main>
  );
};

export default SignUpForm;
