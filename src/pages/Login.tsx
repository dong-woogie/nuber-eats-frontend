import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import FormError from "../components/FormError";

interface ILoginForm {
  email: string;
  password: string;
}

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      ok
      error
      token
    }
  }
`;

function Login() {
  const { register, errors, handleSubmit, getValues } = useForm<ILoginForm>();
  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const onSubmit = () => {
    const { email, password } = getValues();
    loginMutation({
      variables: {
        email,
        password,
      },
    });
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
            <FormError errorMessage={errors.email?.message} />
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
            <FormError errorMessage={errors.password.message} />
          )}
          {errors.password?.type === "minLength" && (
            <FormError errorMessage="Password must be more than 10 chars." />
          )}
          <button className="btn">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
