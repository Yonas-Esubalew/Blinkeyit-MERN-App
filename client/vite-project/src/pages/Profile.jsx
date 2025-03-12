import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import fetchUserDetails from "../utils/fetchUserDetails";
import { setUserDetails } from "../stores/userSlice";
const Profile = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.data);
  const [openProfileAvatarEdit, setOpenProfileAvatarEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  });

  const {loading, setLoading} = useState(false)

  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data : userData
      })


      const {data : responseData} = response

      if(responseData.success){
        toast.success(responseData.message)
        const userData = await fetchUserDetails()
        dispatch(setUserDetails(userData.data))
      }
    } catch (error) {
      AxiosToastError(error)
    } finally{
      setLoading(false)
    }
  };
  console.log("profile", user);
  return (
    <div>
      <div className="w-20 h-20 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
        {user.avatar ? (
          <img alt={user.name} src={user.avatar} className="w-full h-full " />
        ) : (
          <FaRegUserCircle size={50} />
        )}
      </div>
      <button
        onClick={() => setOpenProfileAvatarEdit(true)}
        className="max-w-10 text-center text-sm min-w-20 border px-3 py-1 rounded-full mt-5 hover:border-yellow-300 hover:bg-yellow-400"
      >
        Edit
      </button>
      {openProfileAvatarEdit && (
        <UserProfileAvatarEdit close={() => setOpenProfileAvatarEdit(false)} />
      )}

      {/* name, email, mobile, password */}
      <form className="my-4 grid gap-4" onSubmit={handleSubmit}>
        <div className="grid">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your Name"
            className="border focus-within:border-amber-400 p-2 bg-blue-50 outline-none"
            value={userData.name}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="grid">
          <label>Email</label>
          <input
            required
            type="email"
            placeholder="Enter your Email"
            className="border focus-within:border-amber-400 p-2 bg-blue-50 outline-none"
            value={userData.email}
            onChange={handleOnChange}
          />
        </div>
        <div className="grid">
          <label>Mobile</label>
          <input
            required
            type="text"
            placeholder="Enter your Mobile"
            className="border focus-within:border-amber-400 p-2 bg-blue-50 outline-none"
            value={userData.mobile}
            onChange={handleOnChange}
          />
        </div>

        <button className="border px-4 py-2 font-semibold hover:bg-amber-400 border-yellow-500 rounded">
          {
            loading ? "Loading" : "Submit"
          }
        </button>
      </form>
    </div>
  );
};

export default Profile;
