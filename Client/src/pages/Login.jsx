import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/summaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validValue = Object.values(data).every((el) => el);
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

    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("accesstoken",response.data.data.accesstoken)
        localStorage.setItem("refreshtoken",response.data.data.refreshtoken)
        setData({
          email: "",
          password: "",
        });
        navigate("/")
      }
    //   console.log("response", response);
    } catch (error) {
      AxiosToastError(error);
    }
  };
  //   6:00:00 time back here
  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white w-full my-4 max-w-lg mx-auto rounded p-7">
        <p>Welcome to Binkeyit</p>
        <form onSubmit={handleSubmit} className="grid gap-4 ">
          <div className="grid gap-1">
            <label htmlFor="email">Email :</label>
            <input
              onChange={handleChange}
              type="text"
              autoFocus
              className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200"
              name="email"
              value={data.email}
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="password">Password :</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
              <input
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                autoFocus
                className="w-full bg-blue-50 outline-none"
                name="password"
                value={data.password}
                id="password"
                placeholder="Enter your password"
              />
              <div
                onClick={() => setShowPassword((preve) => !preve)}
                className="cursor-pointer"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>
          <Link to={"/forgot-password"} className=" block ml-auto hover:text-primary-200">Forgot Password?</Link>
          <button
            disabled={!validValue}
            className={` ${
              validValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            } text-white py-2 rounded font-semibold my-3 tracking-wide "`}
          >
            Login
          </button>
        </form>
        <p> Don't have an account?  <Link className="font-semibold text-green-700 hover:text-green-800" to={"/register"}>Register</Link></p>
      </div>
    </section>
  );
};

export default Login;
