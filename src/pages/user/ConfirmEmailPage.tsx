import React, { useEffect } from "react";
import qs from "query-string";
import { useHistory, useLocation } from "react-router-dom";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import {
  verifyEmail,
  verifyEmailVariables,
} from "../../__generated__/verifyEmail";
import { useMe } from "../../lib/hooks/useMe";

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

function ConfirmEmailPage() {
  const history = useHistory();
  const location = useLocation();
  const query: { code?: string } = qs.parse(location.search);
  const client = useApolloClient();
  const { data: userData } = useMe();

  const onCompleted = (data: verifyEmail) => {
    const {
      verifyEmail: { ok },
    } = data;
    if (ok && userData) {
      client.writeFragment({
        id: `User:${userData?.me.id}`,
        fragment: gql`
          fragment VerifiedUser on User {
            verified
          }
        `,
        data: {
          verified: true,
        },
      });
      history.push("/");
    }
  };
  const [verifyEmail] = useMutation<verifyEmail, verifyEmailVariables>(
    VERIFY_EMAIL_MUTATION,
    { onCompleted }
  );

  useEffect(() => {
    if (!query.code || userData) return;
    verifyEmail({
      variables: {
        input: {
          code: query.code,
        },
      },
    });
  }, [query.code, verifyEmail, userData]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center mb-32">
      <h1 className="title">Confirming email...</h1>
      <h4 className="sub">Please wait, don't close this page...</h4>
    </div>
  );
}

export default ConfirmEmailPage;
