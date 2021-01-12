import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import FormError from "../components/FormError";
import {
  loginMitation,
  loginMitationVariables,
} from "../__generated__/loginMitation";
import LogoImage from "../images/eats-logo.svg";
import Button from "../components/Button";
import { Link, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { authTokenVars, loggedVars } from "../apollo";
import {
  EMAIL_PATTERN,
  LOCAL_STORAGE_TOKEN,
  VALIDATION_ERROR_MESSAGE,
} from "../constants";

interface ILoginForm {
  email: string;
  password: string;
}

export const LOGIN_MUTATION = gql`
  mutation loginMitation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      error
      token
    }
  }
`;

function LoginPage() {
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
  const onCompleted = ({ login }: loginMitation) => {
    const { ok, token } = login;
    if (!(ok && token)) return;
    authTokenVars(token);
    loggedVars(true);
    localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
    history.push("/");
  };
  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMitation,
    loginMitationVariables
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
            ref={register({
              required: "Email is required",
              pattern: EMAIL_PATTERN,
            })}
            required
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          {errors.email?.type === "pattern" && (
            <FormError errorMessage={VALIDATION_ERROR_MESSAGE} />
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
          <Button
            activeText="LOGIN"
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

export default LoginPage;