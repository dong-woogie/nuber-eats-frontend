import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import FormError from "../components/FormError";
import LogoImage from "../images/eats-logo.svg";
import Button from "../components/Button";
import { Link, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { UserRole } from "../__generated__/globalTypes";
import {
  createAccountMutation,
  createAccountMutationVariables,
} from "../__generated__/createAccountMutation";

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

function CreateAccount() {
  const {
    register,
    errors,
    handleSubmit,
    getValues,
    formState,
  } = useForm<ICreateAccountForm>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      role: UserRole.Client,
    },
  });
  const history = useHistory();
  const onCompleted = ({ createAccount }: createAccountMutation) => {
    const { ok } = createAccount;
    if (!ok) return;
    history.push("/login");
  };

  const [
    createAccountMutation,
    { data: createMutationResult, loading },
  ] = useMutation<createAccountMutation, createAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );

  const onSubmit = () => {
    if (loading) return;
    createAccountMutation({
      variables: {
        createAccountInput: getValues(),
      },
    });
  };
  return (
    <div className="h-screen flex flex-col items-center mt-10 lg:mt-28">
      <Helmet>
        <title>Create Account | Nuber Eats</title>
      </Helmet>
      <div className="w-full flex flex-col items-center max-w-screen-sm px-5">
        <img className="w-52" src={LogoImage} alt="logo" />
        <h4 className="w-full font-medium text-3xl mt-10 mb-5">
          Let's get started
        </h4>
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
          <select
            ref={register({ required: "Role is required" })}
            className="input"
            name="role"
          >
            {Object.keys(UserRole).map((role) => (
              <option key={role}>{role}</option>
            ))}
          </select>
          <Button
            activeText="Create Account"
            canClick={formState.isValid}
            loading={loading}
          />
        </form>
        {createMutationResult?.createAccount.error && (
          <div className="mt-3 text-xl">
            <FormError
              errorMessage={createMutationResult.createAccount.error}
            />
          </div>
        )}
        <div className="mt-5 text-lg">
          Already use Uber?{"  "}
          <Link to="/login" className="text-lime-700 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
