import React from "react";
import Logo from "../images/nuber-logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useMe } from "../hooks/useMe";
import { useReactiveVar } from "@apollo/client";
import { loggedVars } from "../apollo";

function Header() {
  const { data } = useMe();
  const isLogged = useReactiveVar(loggedVars);
  return (
    <>
      {data && !data?.me.verified && (
        <div className="p-3 text-center bg-gray-700 text-white">
          <span className="font-medium text-base">
            Please verify your email
          </span>
        </div>
      )}
      <header className="py-10">
        <div className="w-full px-8 xl:px-0 max-w-screen-xl mx-auto flex justify-between items-center">
          <Link to="/">
            <img src={Logo} alt="logo" className="w-40" />
          </Link>
          <span>
            {isLogged ? (
              <Link to="/edit-profile">
                <FontAwesomeIcon icon={faUser} className="text-2xl" />
              </Link>
            ) : (
              <Link to="/login">로그인</Link>
            )}
          </span>
        </div>
      </header>
    </>
  );
}

export default Header;
