import { ApolloError, gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import FormError from "../components/FormError";
import {
  LoginMitation,
  LoginMitationVariables,
} from "../__generated__/LoginMitation";

interface ILoginForm {
  email: string;
  password: string;
}

const LOGIN_MUTATION = gql`
  mutation LoginMitation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      error
      token
    }
  }
`;

function Login() {
  const { register, errors, handleSubmit, getValues } = useForm<ILoginForm>();

  const onCompleted = ({ login }: LoginMitation) => {
    const { ok, error, token } = login;
    if (ok) {
      console.log(token);
    }
  };
  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    LoginMitation,
    LoginMitationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });
  const onSubmit = () => {
    if (loading) return;
    const { email, password } = getValues();
    loginMutation({
      variables: {
        loginInput: { email, password },
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
            ref={register({ required: "Email is required" })}
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
            ref={register({ required: "Password is required" })}
            required
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password.message} />
          )}
          {errors.password?.type === "minLength" && (
            <FormError errorMessage="Password must be more than 10 chars." />
          )}
          <button className="btn">{loading ? "Loading..." : "Log In"}</button>
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
