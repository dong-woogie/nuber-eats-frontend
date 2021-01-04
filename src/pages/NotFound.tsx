import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold mb-5">Not Found Page 404</h1>
      <h4 className="text-xl font-medium mb-3">
        The page you're looking for does not exist or has moved.
      </h4>
      <Link to="/" className="text-lime-700 hover:underline">
        Go back home &rarr;
      </Link>
    </div>
  );
}

export default NotFound;
