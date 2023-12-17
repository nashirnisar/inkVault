import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-[#990011]">
      <header className="bg-[#FCF8F1] bg-opacity-30">
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex-shrink-0">
              <a title="Home" className="flex cursor-pointer" to={"/"}>
                {/* <img className="w-auto h-24" src={headerlogo} alt="" /> */}
              </a>
            </div>

            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
            >
              {/* Menu Icon */}
              {isMobileMenuOpen ? (
                <svg
                  className="block w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="hidden w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 8h16M4 16h16"
                  ></path>
                </svg>
              )}
            </button>

            <div className="flex-grow lg:flex lg:items-center lg:justify-center lg:space-x-10">
              {/* Centered Text for Desktop */}
              <a
                onClick={() => navigate("/")}
                title=""
                className=" font-extrabold text-4xl text-white font-outline-2 transition-all duration-200 hover:text-opacity-80 text-center cursor-pointer"
              >
                {" "}
                InkVault!{" "}
                <h2 className="text-2xl">Your Ideas, Your Sanctuary</h2>
              </a>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
