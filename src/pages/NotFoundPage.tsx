import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="base-wrap mb-wrap">
      <Helmet>
        <title>Not found | Nuber Eats</title>
      </Helmet>
      <h1 className="title">Not Found Page 404</h1>
      <h4 className="sub text-center mx-5 sm:mx-0">
        The page you're looking for does not exist or has moved.
      </h4>
      <Link to="/" className="flex justify-center items-center">
        <span className="link">Go back home</span>
        <span className="text-3xl ml-1"> 🏃‍♀️🏃‍♂️ </span>
      </Link>
    </div>
  );
}

export default NotFoundPage;
