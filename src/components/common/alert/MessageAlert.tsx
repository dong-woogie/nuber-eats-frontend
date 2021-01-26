import { useReactiveVar } from "@apollo/client";
import React, { useEffect } from "react";
import { messageAlertVars } from "../../../apollo";

function MessageAlert() {
  const message = useReactiveVar(messageAlertVars);
  useEffect(() => {
    setTimeout(() => {
      messageAlertVars("");
    }, 2000);
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-50 flex justify-center items-center">
      <h3 className="text-white font-bold p-3 bg-gray-900 opacity-90 rounded-md">
        {message}
      </h3>
    </div>
  );
}

export default MessageAlert;
