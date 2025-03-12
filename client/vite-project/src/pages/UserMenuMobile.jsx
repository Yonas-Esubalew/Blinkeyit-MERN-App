import React from "react";
import UserMenu from "../components/UserMenu";
import { IoClose } from "react-icons/io5";
const UserMenuMobile = () => {
  return (
    <section className="bg-white block lg:hidden h-full w-full py-2">
      <button onClick={()=> window.history.back()} className="text-neutral-800 block ml-auto w-fit ">
        <IoClose size={25}/>
      </button>
      <div className="lg:hidden container mx-auto p-5">
        <UserMenu />
      </div>
    </section>
  );
};

export default UserMenuMobile;
