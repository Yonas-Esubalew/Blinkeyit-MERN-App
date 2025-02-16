import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState();
  const validValue = Object.values(data).every(el => el)
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  console.log("data", data);
  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white w-full my-4 max-w-lg mx-auto rounded p-7">
        <p>Welcome to Binkeyit</p>
        <form action="" className="grid gap-4 mt-6 ">
          <div className="grid gap-1">
            <label htmlFor="name">Name :</label>
            <input
              onChange={handleChange}
              type="text"
              autoFocus
              className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200"
              name="name"
              value={data.name}
              id="name"
              placeholder="Enter your name"
            />
          </div>
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
            <div  className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
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
          <div className="grid gap-1">
            <label htmlFor="confirmPassword">confirmPassword :</label>
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
          <button className={` ${validValue ? "bg-green-800" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wide"`}>Register</button>
        </form>
      </div>
    </section>
  );
};

export default Register;
