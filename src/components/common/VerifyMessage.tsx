import React from "react";
import { useMe } from "../../lib/hooks/useMe";

function VerifyMessage() {
  const { data } = useMe();
  if (!data) return null;
  if (data?.me.verified) return null;
  return (
    <div className="p-3 text-center bg-gray-700 text-white">
      <span className="font-medium text-base">Please verify your email</span>
    </div>
  );
}

export default VerifyMessage;
