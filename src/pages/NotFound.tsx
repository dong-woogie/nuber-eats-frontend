import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <h1 className="title">Not Found Page 404</h1>
      <h4 className="sub text-center mx-5 sm:mx-0">
        The page you're looking for does not exist or has moved.
      </h4>
      <Link to="/" className="text-lime-700 hover:underline">
        Go back home &rarr;
      </Link>
    </div>
  );
}

export default NotFound;
