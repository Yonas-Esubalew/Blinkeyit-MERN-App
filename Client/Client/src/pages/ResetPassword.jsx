import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/summaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate, useLocation } from "react-router-dom";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validValue = Object.values(data).every((el) => el);
  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate("/");
    }
    if (location?.state?.email) {
      setData((preve) => {
        return {
          ...preve,
          email: location?.state?.email,
        };
      });
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    ///optional
    if (data.newPassword !== data.confirmPassword) {
      toast.error("New password and confirm password must be same.");
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.resetPassword,
        data : data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
        setData({
          email: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
        console.log("response", response);
    } catch (error) {
      AxiosToastError(error);
    }
  };

  console.log("data", data);
  console.log("resetPassword", location);
  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white w-full my-4 max-w-lg mx-auto rounded p-7">
        <p>Please reset your password</p>
        <form onSubmit={handleSubmit} className="grid gap-4 mt-6 ">
          <div className="grid gap-1">
            <label htmlFor="newPassword">New password :</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
              <input
                onChange={handleChange}
                type={showNewPassword ? "text" : "password"}
                
                className="w-full bg-blue-50 outline-none"
                name="newPassword"
                value={data.newPassword}
                id="password"
                placeholder="Enter your new password"
              />
              <div
                onClick={() => setShowNewPassword((preve) => !preve)}
                className="cursor-pointer"
              >
                {showNewPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <label htmlFor="confirmPassword">Confirm password :</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
              <input
                onChange={handleChange}
                type={showConfirmPassword ? "text" : "password"}
                autoFocus
                className="bg-blue-50 w-full outline-none"
                name="confirmPassword"
                value={data.confirmPassword}
                id="confirmPassword"
                placeholder="Enter your confirm password"
              />
              <div
                onClick={() => setShowConfirmPassword((preve) => !preve)}
                className="cursor-pointer"
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>
          <button
            disabled={!validValue}
            className={` ${
              validValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            } text-white py-2 rounded font-semibold my-3 tracking-wide "`}
          >
            Change Password
          </button>
        </form>
        <p>
          {" "}
          Already have account?{" "}
          <Link
            className="font-semibold text-green-700 hover:text-green-800"
            to={"/login"}
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ResetPassword;
