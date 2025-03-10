import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate ,Link} from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { FaArrowLeft } from "react-icons/fa";
import { useMobile } from "../hooks/useMobile";
const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();
  useEffect(() => {
    if (location.pathname === "/search") {
      setIsSearchPage(true);
    } else {
      setIsSearchPage(false);
    }
  }, [location]);

  console.log("location", location);
  console.log("SearchPage", isSearchPage);
  const redirectToSearchPage = () => {
    navigate("/search");
  };

  return (
    <div className="w-full overflow-hidden min-w-[300px] lg:min-w-[420px] h-10 lg:h-12 rounded-lg border flex items-center text-neutral-500 bg-slate-100">
      <div>
        {(isSearchPage && isMobile) ? (
          // not in search page
          <Link to={"/"} className="flex justify-center items-center h-full p-3 text-neutral-700 focus-within:outline-yellow-400 outline">
            <FaArrowLeft size={22} />
          </Link>
          
        ) : (
            <button className="flex justify-center items-center h-full p-3 text-neutral-700 focus-within:outline-yellow-400 outline">
            <IoSearch size={22} />
          </button>
        )}
      </div>
      <div>
        {!isSearchPage ? (
          // not in search page
          <div
            onClick={redirectToSearchPage}
            className="w-full h-full flex justify-center items-center"
          >
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                'Search "milk"',
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                'Search "bread"',
                1000,
                'Search "sugar"',
                1000,
                'Search "panner"',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          //when in search page
          <div className="w-full h-full ">
            <input
              type="text"
              placeholder="Search for atta dal and more"
              className="bg-transparent w-full h-full outline-none"
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
