import React from "react";
import Button from "../../components/common/Button";
import { useForm } from "react-hook-form";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useMe } from "../../lib/hooks/useMe";
import { useHistory } from "react-router-dom";
import {
  editProfile,
  editProfileVariables,
} from "../../__generated__/editProfile";
import { EMAIL_PATTERN, VALIDATION_ERROR_MESSAGE } from "../../constants";
import FormError from "../../components/common/FormError";
import { Helmet } from "react-helmet-async";
import { EDIT_PROFILE_MUTATION } from "../../lib/graphql/user";

interface IForm {
  email?: string;
  password?: string;
}

function EditProfilePage() {
  const { data: userData, loading /*refetch*/ } = useMe();
  const {
    register,
    handleSubmit,
    getValues,
    formState,
    errors,
  } = useForm<IForm>({
    defaultValues: {
      email: userData?.me.email || "",
    },
    mode: "onChange",
  });
  const client = useApolloClient();
  const history = useHistory();
  const onCompleted = async (data: editProfile) => {
    const { ok } = data.editProfile;
    if (ok && userData) {
      // cache를 건들이는 cache state 변경방법1
      const { email: newEmail } = getValues();
      const {
        me: { email: preEmail, id },
      } = userData;
      if (newEmail !== preEmail) {
        client.writeFragment({
          id: `User:${id}`,
          fragment: gql`
            fragment EditedUser on User {
              email
              verified
            }
          `,
          data: {
            email: getValues().email,
            verified: false,
          },
        });
      }

      // refetch하는 cache state 변경방법2 ( backend의 과부하가 걸릴 때는 지양)
      // await refetch();
      history.push("/");
    }
  };
  const [editProfile, { loading: editProfileLoading }] = useMutation<
    editProfile,
    editProfileVariables
  >(EDIT_PROFILE_MUTATION, { onCompleted });

  const onSubmit = () => {
    const { email: newEmail, password: newPassword } = getValues();
    if (!userData) return;

    editProfile({
      variables: {
        input: {
          ...(userData?.me.email !== newEmail && { email: newEmail }),
          ...(newPassword && { password: newPassword }),
        },
      },
    });
  };

  if (loading || !userData) {
    return (
      <div className="base-wrap mb-52">
        <span className="title">Loading...</span>
      </div>
    );
  }

  return (
    <div className="base-wrap mb-52">
      <Helmet>
        <title>Edit Profile | Nuber Eats</title>
      </Helmet>
      <h4 className="sub">Edit Profile</h4>
      <form
        className="grid gap-3 w-full max-w-screen-sm px-10 md:px-0"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          ref={register({
            pattern: EMAIL_PATTERN,
          })}
          className="input"
          name="email"
          type="email"
          placeholder="Email"
        />
        {errors.email?.type === "pattern" && (
          <FormError errorMessage={VALIDATION_ERROR_MESSAGE} />
        )}
        <input
          ref={register}
          className="input"
          name="password"
          type="password"
          placeholder="Password"
        />
        <Button
          loading={editProfileLoading}
          activeText="Save Profile"
          canClick={formState.isValid}
        />
      </form>
    </div>
  );
}

export default EditProfilePage;
