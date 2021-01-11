import React from "react";
import { FadeLoader } from "react-spinners";

function Loading() {
  return (
    <div className="base-wrap mb-52">
      <FadeLoader loading={true} />
    </div>
  );
}

export default Loading;
