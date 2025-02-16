import React from "react";
import logo from "../assets/logo.png";
import Search from "./Search";
import { Link, useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import useMobile from "../hooks/useMobile";
import { FaCartShopping } from "react-icons/fa6"

function Header() {
  const [isMobile] = useMobile();

  const location = useLocation();
  const isSearchPage = location.pathname === "/search";

  console.log("isSearchPage", isSearchPage);
  console.log("location", location);
  console.log("ismobile", isMobile);
  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 flex flex-col justify-center gap-2">
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
              <Link to={"/login"}>Login</Link>
              <button className="flex items-center gap-2 bg-secondary-200 px-2 y-1 rounded">
                {/* add to cart items */}
                <div>
                  <FaCartShopping size={28} />
                </div>
                <div>
                  <p>1 items</p>
                  <p>total price</p>
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
