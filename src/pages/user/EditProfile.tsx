import React from "react";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useMe } from "../../hooks/useMe";
import { useHistory } from "react-router-dom";
import {
  editProfile,
  editProfileVariables,
} from "../../__generated__/editProfile";

interface IForm {
  email?: string;
  password?: string;
}

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

function EditProfile() {
  const { data: userData, loading /*refetch*/ } = useMe();
  const { register, handleSubmit, getValues, formState } = useForm<IForm>({
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
      <h4 className="sub">Edit Profile</h4>
      <form
        className="grid gap-3 w-full max-w-screen-sm px-10 md:px-0"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          ref={register({
            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          className="input"
          name="email"
          type="email"
        />
        <input
          ref={register}
          className="input"
          name="password"
          type="password"
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

export default EditProfile;
