import React from "react";
import UserMenu from "../components/UserMenu";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <section className="bg-white">
      <div className="container p-3 flex mx-auto">
          {/* left for menu */}
          <div className="py-4 sticky top-24 overflow-y-auto hidden lg:block">
            <UserMenu/>
          </div>
          {/* right for the menu */}
          <div className=" w-full ml-6 m-0">
            <Outlet/>
          </div>
        </div>
    </section>
  );
};

export default Dashboard;
