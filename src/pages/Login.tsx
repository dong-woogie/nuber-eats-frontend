import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import FormError from "../components/FormError";
import {
  LoginMitation,
  LoginMitationVariables,
} from "../__generated__/LoginMitation";
import LogoImage from "../images/eats-logo.svg";
import Button from "../components/Button";
import { Link, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { authTokenVars, loggedVars } from "../apollo";

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
  const {
    register,
    errors,
    handleSubmit,
    getValues,
    formState,
  } = useForm<ILoginForm>({
    mode: "onChange",
  });
  const history = useHistory();
  const onCompleted = ({ login }: LoginMitation) => {
    const { ok, token } = login;
    if (!ok) return;
    authTokenVars(token);
    loggedVars(true);
    history.push("/");
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
    <div className="h-screen flex flex-col items-center mt-10 lg:mt-28">
      <Helmet>
        <title>Login | Nuber Eats</title>
      </Helmet>
      <div className="w-full flex flex-col items-center max-w-screen-sm px-5">
        <img className="w-52" src={LogoImage} alt="logo" />
        <h4 className="w-full font-medium text-3xl mt-10 mb-5">Welcome back</h4>
        <form className="grid gap-3 w-full" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="input"
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
          <Button
            activeText="Log In"
            canClick={formState.isValid}
            loading={loading}
          />
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
        <div className="mt-5 text-lg">
          Uber는 처음이신가요?{"  "}
          <Link to="/create-account" className="text-lime-700 hover:underline">
            계정 만들기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
