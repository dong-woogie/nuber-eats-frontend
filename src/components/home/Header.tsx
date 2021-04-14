import React, { useState } from "react";
import Logo from "../../images/nuber-logo.svg";
import { Link } from "react-router-dom";
import { useMe } from "../../lib/hooks/useMe";
import SearchForm from "./SearchForm";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserRole } from "../../__generated__/globalTypes";
import VerifyMessage from "../common/VerifyMessage";
import Address from "../common/Address";
import { loggedVars } from "../../apollo";

function Header() {
  const { data } = useMe();
  const [isSearchForm, setIsSearchForm] = useState(false);
  const [isSettingTab, setIsSettingTab] = useState(false);

  const onClickSearchIcon = () => {
    setIsSearchForm(!isSearchForm);
  };

  const onClickUserIcon = () => {
    setIsSettingTab(!isSettingTab);
  };

  const logout = () => {
    localStorage.clear();
    loggedVars(false);
  };

  const isClient = data?.me.role === UserRole.Client;

  return (
    <>
      <VerifyMessage />
      <Address />
      <header className="pb-1 sm:py-3">
        <div className="base-wrap-w flex flex-wrap items-center">
          <Link to="/" className="order-1">
            <img src={Logo} alt="logo" className="w-40" />
          </Link>

          {isClient && (
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
          )}

          <div
            className={`relative w-14 h-14 flex justify-center items-center order-3 sm:order-4 cursor-pointer ${
              isClient ? "" : "ml-auto"
            }`}
            onClick={onClickUserIcon}
          >
            <FontAwesomeIcon icon={faUser} className="text-xl" />
            {isSettingTab && (
              <div className="absolute w-32 top-3/4 right-1/4 rounded-md shadow-2xl bg-gray-50 border border-gray-200">
                <Link to="/edit-profile">
                  <div className="py-1.5 px-3 hover:bg-gray-100 active:bg-gray-200 rounded-md rounded-b-none">
                    <span className="text-sm font-bold">프로필</span>
                  </div>
                </Link>
                <div
                  className="py-1.5 px-3 border-t border-gray-400 rounded-md rounded-t-none cursor-pointer hover:bg-gray-100 active:bg-gray-200"
                  onClick={logout}
                >
                  <span className="text-sm font-bold">로그아웃</span>
                </div>
              </div>
            )}
          </div>

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
