import React, { useState } from "react";
import Logo from "../images/nuber-logo.svg";
import { Link } from "react-router-dom";
import { useMe } from "../lib/hooks/useMe";
import SearchForm from "./SearchForm";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header() {
  const { data } = useMe();
  const [isSearchForm, setIsSearchForm] = useState(false);

  const onClickSearchIcon = () => {
    setIsSearchForm(!isSearchForm);
  };

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

          <div
            className={`w-10 h-10 rounded-full cursor-pointer order-2 sm:order-3 ${
              isSearchForm ? "bg-gray-300" : "bg-white"
            } flex justify-center items-center ml-auto ${
              isSearchForm && "sm:ml-5"
            }`}
            onClick={onClickSearchIcon}
          >
            <FontAwesomeIcon icon={faSearch} className="text-lg" />
          </div>

          <Link
            to="/edit-profile"
            className="w-14 h-14 flex justify-center items-center order-3 sm:order-4"
          >
            <FontAwesomeIcon icon={faUser} className="text-xl" />
          </Link>

          <div
            className={`${
              isSearchForm ? "block" : "hidden"
            } w-full sm:w-2/5 mt-3 sm:mt-0 flex items-center order-4 sm:order-2 sm:ml-auto `}
          >
            <SearchForm />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
