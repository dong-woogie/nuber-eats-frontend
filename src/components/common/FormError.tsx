import React from "react";

interface IFormError {
  errorMessage: string;
}

function FormError({ errorMessage }: IFormError) {
  return (
    <span role="alert" className="text-red-500 font-medium">
      {errorMessage}
    </span>
  );
}

export default FormError;
