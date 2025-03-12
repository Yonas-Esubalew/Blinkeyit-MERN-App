import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validValue = Object.values(data).every((el) => el);
  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate("/");
    }

    if (location?.state?.data) {
      setData((prev) => {
        return {
          ...prev,
          email: location?.state?.email,
        };
      });
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(data.newPassword !== data.confirmPassword){
      toast.error("password and confirm password must be same");
      return;
    }
    try {
      const response = await Axios({
        ...SummaryApi.reset_password,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          email: "",
          newPassword: "",
          confirmPassword: "",
        });
        navigate("/login");
      }
      console.log("response", response);
    } catch (error) {
      AxiosToastError(error);
    }
    // Fdx33JGWMgRL0Kaq
  };
  console.log("data", data);
  console.log("rest-passwordPage", location);
  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-4">
        <p>Welcome to Binkeyit</p>
        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="password">New Password :</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center w-full focus:border-yellow-400">
              <input
                placeholder="Enter your newPassword"
                type={showPassword ? "text" : "password"}
                autoFocus
                className="w-full outline-none"
                name="newPassword"
                value={data.newPassword}
                onChange={handleChange}
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <label htmlFor="password">Confirm Password :</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center outline-none ">
              <input
                placeholder="Confirm your Password"
                type={showConfirmPassword ? "text" : "password"}
                autoFocus
                className=" w-full outline-none"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
              />
              <div
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="cursor-pointer"
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>

          <button
            disabled={!validValue}
            className={`${
              validValue ? "bg-green-700" : "bg-gray-500"
            }  text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Change Password
          </button>
        </form>
        <p>
          Already have an Account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </section>
  );
};
export default ResetPassword;
