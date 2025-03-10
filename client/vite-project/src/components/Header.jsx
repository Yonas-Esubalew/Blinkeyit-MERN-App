import React from "react";
import logo from "../assets/logo.png";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useMobile } from "../hooks/useMobile";
import { BsCart4 } from "react-icons/bs";
const Header = () => {
  const [isMobile] = useMobile()
  console.log("isMobile", isMobile)
  const location = useLocation()
  console.log("location", location)
  const isSearchPage = location.pathname === "/search"
  console.log("isSearchPage", isSearchPage)
  const navigate  = useNavigate()

  const redirectToLoginPage = ()=>{
    navigate("/login")
  }
  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 flex items-center flex-col justify-center">
      {
        !(isSearchPage && isMobile) && (
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
        <div className="hidden lg:block"><Search/></div>
        {/* login and my cart */}
        <div className="">
          {/* mobile version */}
          <button className="text-neutral-600 lg:hidden">
            <FaUserCircle size={28} cursor={"pointer"}/>
          </button>

          {/* only for desktop */}
          <div className=" hidden lg:flex items-center gap-10">
           <button onClick={redirectToLoginPage} className="text-lg px">Login</button>
           <button className="flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-3 rounded text-white">
            {/* add to cart items */}
            <div className="animate-bounce">
              <BsCart4 size={30}/>
            </div>
            <div>
              <p>My Cart </p>
              
            </div>
           </button>
          </div>
        </div>
      </div>
        )
      }
      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
