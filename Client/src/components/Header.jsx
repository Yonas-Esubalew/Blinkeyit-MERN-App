import React from "react";
import logo from "../assets/logo.png";
import Search from "./Search";
import { Link, useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import useMobile from "../hooks/useMobile";


function Header() {
  const [isMobile] = useMobile()

  const location = useLocation()

  console.log("location", location)
  console.log("ismobile", isMobile)
  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 bg-red-400 flex flex-col justify-center gap-2">
      <div className="container lg:h-full flex mx-auto items-center  px-2 justify-between">
        {/* logo */}
        <div className="h-full">
          <Link
            to={"/"}
            className="h-full justify-center flex items-center px-2 "
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
          <button className="text-neutral-600 lg:hidden ">
            <FaUser size={26}/>
          </button>
        <div className="hidden lg:block">Login And my Cart</div>
        </div>
      </div>
      <div className="container mx-auto px-2 lg:hidden">
        <Search/>
      </div>
    </header>
  );
}

export default Header;
