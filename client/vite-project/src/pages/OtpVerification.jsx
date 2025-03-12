import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import { useNavigate, Link, useLocation } from "react-router-dom";
const OtpVerification = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();

  const inputRef = useRef([]);
  const location = useLocation();

  useEffect(()=> {
    if(!location?.state?.email) {
      navigate("/forgot-password")
    }
  })
  const validValue = data.every((el) => el);
  console.log("location", location);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.OtpVerification,
        data: {
          otp: data.join(""),
          email: location?.state?.email
        },
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setData(["", "", "", "", "", ""]);
        navigate("/reset-password",{
          state : {
            data : response.data,
            email :  location?.state?.email,
          }
        });
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
            <div className="flex gap-3">
              {data.map((element, index) => {
                return (
                  <input
                    ref={(ref) => {
                      inputRef.current[index];
                      return ref;
                    }}
                    type="text"
                    id="otp"
                    autoFocus
                    className="bg-blue-50 p-2 border rounded max-w-12 justify-center items-center text-center font-semibold "
                    key={"otp" + index}
                    value={data[index]}
                    maxLength={1}
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
            className={`${
              validValue ? "bg-green-700" : "bg-gray-500"
            }  text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Verify OTP
          </button>
        </form>
        <p>
          Already have an Account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </section>
  );
};

export default OtpVerification;
