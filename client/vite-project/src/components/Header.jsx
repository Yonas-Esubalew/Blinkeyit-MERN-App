import React, { useState } from "react";
import logo from "../assets/logo.png";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useMobile } from "../hooks/useMobile";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from "./UserMenu";
const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user.data ?? null);
  console.log("user from Store", user);

  const [openUserMenu, setOpenUserMenu] = useState(false);
  const redirectToLoginPage = () => {
    navigate("/login");
  };

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  };

  const handleMobileUser = () => {
    if(!user._id){
      navigate("/login")
      return
    }
    navigate("/user")

  };
  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 flex items-center flex-col justify-center bg-white">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto items-center flex justify-between">
          {/* logo */}
          <div className="h-full ">
            <Link to={"/"} className="h-full flex justify-center items-center">
              <img
                src={logo}
                alt="logo"
                width={170}
                height={60}
                className="hidden lg:block"
              />
              <img
                src={logo}
                alt="logo"
                width={110}
                height={60}
                className="lg:hidden"
              />
            </Link>
          </div>
          {/* search */}
          <div className="hidden lg:block">
            <Search />
          </div>
          {/* login and my cart */}
          <div className="">
            {/* mobile version */}
            <button
              className="text-neutral-600 lg:hidden"
              onClick={handleMobileUser}
            >
              <FaUserCircle size={28} cursor={"pointer"} />
            </button>

            {/* only for desktop */}
            <div className=" hidden lg:flex items-center gap-10">
              {user?._id ? (
                <div className="relative">
                  <div
                    className="flex items-center gap-2 cursor-pointer select-none"
                    onClick={() => setOpenUserMenu((prev) => !prev)}
                  >
                    <p>Account</p>
                    {openUserMenu ? (
                      <GoTriangleUp size={25} />
                    ) : (
                      <GoTriangleDown size={25} />
                    )}
                  </div>
                  {openUserMenu && (
                    <div className="absolute right-0 top-11 ">
                      <div className="bg-white rounded p-4 min-w-52 lg:shadow-lg">
                        <UserMenu close={handleCloseUserMenu} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={redirectToLoginPage} className="text-lg px">
                  Login
                </button>
              )}

              <button className="flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-3 rounded text-white">
                {/* add to cart items */}
                <div className="animate-bounce">
                  <BsCart4 size={30} />
                </div>
                <div>
                  <p>My Cart </p>
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
};

export default Header;
