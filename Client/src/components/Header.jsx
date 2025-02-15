import React from "react";
import logo from "../assets/logo.png";
import Search from "./Search";

function Header() {
  return (
    <header className="h-20 shadow-md sticky top-0">
      <div className="container flex mx-auto items-center h-full px-2 justify-between">
        {/* logo */}
        <div className="h-full">
          <div className="h-full justify-center flex items-center px-2 ">
            {/* logo for desktop version  */}
            <img src={logo} alt="Logo" width={170} height={60} className="hidden lg:block"/>
             {/* logo for Mobile version  */}
            <img src={logo} alt="Logo" width={120} height={60} className="lg:hidden"/>
          </div>
        </div>
        {/* Search */}
        <div>
          <Search/>
        </div>

        {/* login and My cart */}
        <div>
          Login And my Cart
        </div>
      </div>
    </header>
  );
}

export default Header;
