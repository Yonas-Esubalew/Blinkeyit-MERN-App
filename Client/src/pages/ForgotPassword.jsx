import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/summaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  });
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
        ...SummaryApi.forgot_password,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/verification-otp", {
          state : data
        })
        setData({
          email: "",
        });

      }
    //   console.log("response", response);
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white w-full my-4 max-w-lg mx-auto rounded p-7">
        <p className="font-semibold text-lg">Forgot Password</p>
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
          <button
            disabled={!validValue}
            className={` ${
              validValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            } text-white py-2 rounded font-semibold my-3 tracking-wide "`}
          >
            Send Otp
          </button>
        </form>
        <p> Already have an account?  <Link className="font-semibold text-green-700 hover:text-green-800" to={"/login"}>Login</Link></p>
      </div>
    </section>
  );
};

export default ForgotPassword;
