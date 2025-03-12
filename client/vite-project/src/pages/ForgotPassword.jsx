import React, { useState } from "react";
import toast from "react-hot-toast";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import {useNavigate ,Link} from "react-router-dom"
const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const validValue = Object.values(data).every((el) => el);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.forgotPassword,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/otp-verification",{
          state : data
        })
        setData({
            email : "",
        })
      }
      console.log("response", response);
    } catch (error) {
      AxiosToastError(error);
    }

    // Fdx33JGWMgRL0Kaq
  };
  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-4">
        <p>Welcome to Binkeyit</p>

        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          
          <div className="grid gap-1">
            <label htmlFor="email">Email :</label>
            <input
              placeholder="Enter your email"
              type="email"
              id="email"
              autoFocus
              className="bg-blue-50 p-2 border rounded"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <button
            disabled={!validValue}
            className={`${
              validValue ? "bg-green-700" : "bg-gray-500"
            }  text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Send Otp
          </button>
        </form>


        <p>
            Already have an Account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;
