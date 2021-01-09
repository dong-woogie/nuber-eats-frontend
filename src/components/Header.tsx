import React from "react";
import Logo from "../images/nuber-logo.svg";
import { Link } from "react-router-dom";
import { useMe } from "../lib/hooks/useMe";
import SearchForm from "./SearchForm";

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
        <div className="base-wrap-w flex flex-wrap items-center justify-between ">
          <Link to="/">
            <img src={Logo} alt="logo" className="w-40" />
          </Link>
          <div className="w-full sm:w-2/5 mt-10 sm:mt-0">
            <SearchForm />
          </div>
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
