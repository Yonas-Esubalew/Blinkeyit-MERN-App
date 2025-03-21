import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { logout } from "../stores/userSlice";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { FiExternalLink } from "react-icons/fi";
const UserMenu = ({ close }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });
      if (response.data.success) {
        if (close) {
          close();
        }
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/")
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  const handleClose = ()=>{
    if(close){
      close()
    }
  }
  return (
    <div>
      <div className="font-semibold">My Account</div>
      <div className="text-sm flex items-center gap-2 border-r-2"><span>{user.name || user.mobile}</span> <Link onClick={handleClose} to={"/dashboard/profile"} className="hover:text-yellow-400"><FiExternalLink/></Link></div>
      <Divider />
      <div className="text-sm grid gap-2 ">
        <Link onClick={handleClose} to={"/dashboard/myorders"} className="px-2 hover:bg-amber-100">
          My Orders
        </Link>
        <Link onClick={handleClose} to={"/dashboard/product"} className="px-2 hover:bg-amber-100">
          Product
        </Link>
        <Link onClick={handleClose} to={"/dashboard/upload-product"} className="px-2 hover:bg-amber-100">
          Upload Product
        </Link>
        <Link onClick={handleClose} to={"/dashboard/category"} className="px-2 hover:bg-amber-100">
          Category
        </Link>
        <Link onClick={handleClose} to={"/dashboard/sub-category"} className="px-2 hover:bg-amber-100">
          Sub Category
        </Link>
        <Link onClick={handleClose} to={"/dashboard/address"} className="px-2 hover:bg-amber-100">
          Save Address
        </Link>
        <button onClick={handleLogout} className="text-left px-2">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
