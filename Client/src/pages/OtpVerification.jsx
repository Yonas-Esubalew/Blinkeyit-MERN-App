import React, { useEffect, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/summaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location", location);


  useEffect(()=>{
    if(!location?.state?.email){
        navigate("/forgot-password")
    }
  },[])

  const validValue = Object.values(data).every((el) => el);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.forgot_password_otp_verification,
        data: {
            otp : data.join(""),
            email : location?.state?.email
        }
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setData(["", "", "", "", "", ""]);
        // navigate("/verification-otp")
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white w-full my-4 max-w-lg mx-auto rounded p-7">
        <p className="font-semibold text-lg">Enter OTP</p>
        <form onSubmit={handleSubmit} className="grid gap-4 ">
          <div className="grid gap-1">
            <label htmlFor="otp">Enter Your OTP :</label>
            <div className="flex items-center gap-2 justify-between mt-3">
              {data.map((element, index) => {
                return (
                  <input
                    type="text"
                    className="bg-blue-50 w-full max-w-16 p-2 border rounded outline-none focus:border-primary-200 text-center font-semibold"
                    id="otp"
                    ref={(ref) => {
                      inputRef.current[index] = ref;
                      return ref;
                    }}
                    key={"otp" + index}
                    maxLength={1}
                    value={data[index]}
                    onChange={(e) => {
                      const value = e.target.value;
                      console.log("value", value);
                      const newData = [...data];
                      newData[index] = value;
                      setData(newData);

                      if (value && index < 5) {
                        inputRef.current[index + 1].focus();
                      }
                    }}
                  />
                );
              })}
            </div>
          </div>
          <button
            disabled={!validValue}
            className={` ${
              validValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            } text-white py-2 rounded font-semibold my-3 tracking-wide "`}
          >
            Verify Otp
          </button>
        </form>
        <p>
          {" "}
          Already have an account?{" "}
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

export default OtpVerification;
