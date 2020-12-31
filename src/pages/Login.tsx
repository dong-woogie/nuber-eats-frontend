import React from "react";
import { useForm } from "react-hook-form";

interface ILoginForm {
  email: string;
  password: string;
}

function Login() {
  const { register, errors, handleSubmit, getValues } = useForm<ILoginForm>();
  const onSubmit = () => {
    console.log(getValues());
  };
  return (
    <div className="h-screen bg-gray-800 flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg w-full max-w-lg text-center shadow-2xl">
        <h3 className="text-2xl text-gray-600">Login</h3>
        <form className="grid gap-3 px-5" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="input mt-5"
            placeholder="Email"
            name="email"
            type="email"
            ref={register({
              required: "Email is required",
            })}
            required
          />
          {errors.email?.message && (
            <span className="text-red-500 font-medium">
              {errors.email.message}
            </span>
          )}
          <input
            className="input"
            placeholder="Password"
            name="password"
            type="password"
            ref={register({
              required: "Password is required",
              minLength: 10,
            })}
            required
          />
          {errors.password?.message && (
            <span className="text-red-500 font-medium">
              {errors.password.message}
            </span>
          )}
          {errors.password?.type === "minLength" && (
            <span className="text-red-500 font-medium">
              Password must be more than 10 chars.
            </span>
          )}
          <button className="btn">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
