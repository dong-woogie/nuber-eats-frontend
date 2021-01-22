import React from "react";

interface ILoadErrorProps {
  error?: string | null;
}

function LoadError({ error }: ILoadErrorProps) {
  return (
    <div className="base-wrap mt-52">
      <span className="font-medium text-3xl tracking-wider">{error}</span>
    </div>
  );
}

export default LoadError;
