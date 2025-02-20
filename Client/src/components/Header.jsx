import React, { useState } from "react";
import logo from "../assets/logo.png";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import useMobile from "../hooks/useMobile";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp } from "react-icons/go";
import UserMenu from "./UserMenu";

function Header() {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();

  const user = useSelector((state) => state?.user);
  console.log("user from store", user);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  console.log("isSearchPage", isSearchPage);
  console.log("location", location);
  console.log("ismobile", isMobile);
  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 flex flex-col justify-center gap-2 bg-white">
      {!(isSearchPage && isMobile) && (
        <div className="container lg:h-full flex mx-auto items-center  px-2 justify-between">
          {/* logo */}
          <div className="h-full">
            <Link
              to={"/"}
              className="h-full justify-center flex items-center px-2"
            >
              {/* logo for desktop version  */}
              <img
                src={logo}
                alt="Logo"
                width={170}
                height={60}
                className="hidden lg:block"
              />
              {/* logo for Mobile version  */}
              <img
                src={logo}
                alt="Logo"
                width={120}
                height={60}
                className="lg:hidden"
              />
            </Link>
          </div>
          {/* Search */}
          <div className="hidden lg:block">
            <Search />
          </div>

          {/* login and My cart */}
          <div className="">
            {/* user icon display only mobile version */}
            <button className="text-neutral-600 lg:hidden ">
              <FaUser size={26} />
            </button>
            {/* desktop version */}
            <div className="hidden lg:flex items-center gap-10">
              {user?._id ? (
                <div className="relative">
                  <div
                    onClick={() => setOpenUserMenu((preve) => !preve)}
                    className="flex items-center gap-1 select-none cursor-pointer"
                  >
                    <p>Account</p>
                    {openUserMenu ? (
                      <GoTriangleUp size={25} />
                    ) : (
                      <GoTriangleDown size={25} />
                    )}
                  </div>
                  {openUserMenu && (
                    <div className="absolute right-0 top-16">
                      <div className="bg-white  rounded p-4 min-w-52 lg:shadow-lg -mt-3 ">
                        <UserMenu />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={redirectToLoginPage}>Login</button>
              )}

              <button className="flex items-center gap-2 bg-se px-2 py-3  bg-green-800 hover:bg-green-700 text-white rounded">
                {/* add to cart items */}
                <div className="animate-bounce">
                  <BsCart4 size={26} />
                </div>
                <div className="font-semibold">
                  <p>My Cart</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
}

export default Header;
