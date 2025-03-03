import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/summaryApi";
import { logout } from "../store/userSlice";
import { FaExternalLinkAlt } from "react-icons/fa";
const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });
      console.log("logout", response);
      if (response.data.success) {
        if (close) {
          close();
        }
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      AxiosToastError(error);
    }
  };

  return (
    <div>
      <div className="font-semibold">My Account</div>
      <div className="text-sm flex items-center gap-1">
        <span className="max-w-55 text-ellipsis line-clamp-1">{user.name || user.mobile} </span>
        <Link className=" py-1" to={"/dashboard/profile"}>
          <FaExternalLinkAlt className="hover:text-primary-100" size={15} />
        </Link>
      </div>
      <Divider />
      <div className="text-sm grid gap-2">
        <Link to={"/dashboard/my-orders"} className="px-2 hover:bg-orange-200 py-1">
          My Orders
        </Link>
        <Link to={"/dashboard/address"} className="px-2 hover:bg-orange-200 py-1">
          Save Address
        </Link>
        <button
          onClick={handleLogout}
          className="text-left  hover:bg-orange-200 py-1"
        >
          {" "}
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
