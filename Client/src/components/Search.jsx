import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);

  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };
  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px]   lg:h-12 h-10 rounded-lg border overflow:hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200">
      <button className="flex justify-center items-center h-full p-3   group focus-within:text-primary-200">
        <IoSearch size={22} />
      </button>
      <div className="w-full h-full">
        {!isSearchPage ? (
          //  not in search  page
          <div onClick={redirectToSearchPage} className="w-full h-full flex items-center">
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                'Search "milk"',
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                'Search "bread"',
                1000,
                'Search "sugar"',
                1000,
                'Search "melon"',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          //  when I was Search page
          <div className="w-full h-full">
            <input type="text" placeholder="Search for Ata dal and more" className="bg-transparent h-full w-full outline-none" autoFocus />
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
