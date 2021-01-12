import React from "react";
import Logo from "../images/nuber-logo.svg";
import { Link } from "react-router-dom";
import { useMe } from "../lib/hooks/useMe";
import SearchForm from "./SearchForm";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header() {
  const { data } = useMe();
  return (
    <>
      {data && !data?.me.verified && (
        <div className="p-3 text-center bg-gray-700 text-white">
          <span className="font-medium text-base">
            Please verify your email
          </span>
        </div>
      )}
      <header className="py-5">
        <div className="base-wrap-w flex flex-wrap items-center">
          <Link to="/" className="order-1">
            <img src={Logo} alt="logo" className="w-40" />
          </Link>
          <div className="w-full sm:w-2/5 mt-10 sm:mt-0 flex items-center order-3 sm:order-2 sm:ml-auto">
            <SearchForm />
          </div>
          <Link
            to="/edit-profile"
            className="w-14 h-14 flex justify-center items-center order-2 sm:order-3 ml-auto sm:ml-5"
          >
            <FontAwesomeIcon icon={faUser} className="text-xl" />
          </Link>
          {/* <div className="sm:hidden w-full flex items-center justify-between pt-5">
            <div></div>
            <div className="w-10 h-10 rounded-full cursor-pointer bg-gray-200 hover:bg-gray-300 active:bg-gray-400 flex justify-center items-center">
              <FontAwesomeIcon icon={faSearch} className="text-lg" />
            </div>
          </div> */}
        </div>
      </header>
    </>
  );
}

export default Header;
