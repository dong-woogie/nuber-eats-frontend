import React from "react";
import { FadeLoader } from "react-spinners";

interface ILoadingProps {
  loading: boolean;
}

function Loading({ loading }: ILoadingProps) {
  return (
    <div className="base-wrap mb-52">
      <FadeLoader loading={loading} />
    </div>
  );
}

export default Loading;
