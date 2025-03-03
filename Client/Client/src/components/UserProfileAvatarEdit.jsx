import React from "react";
import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common/summaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import { updateAvatar } from "../store/userSlice";
const UserProfileAvatarEdit = () => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false)
//   const dispatch = useDispatch()
  const handleSubmit=  (e)=> {
    e.preventDefault()
  }

  const handleUploadAvatarImage= async(e)=>{
    const file  = e.target.files[0]

    const formData = new FormData()
    formData.append("avatar", file)

    try {
        setLoading(true)
        const response =await Axios({
            ...SummaryApi.uploadAvatar,
            data: formData
        })
        console.log(response)
        const {data: responseData} = response
        dispatch(updateAvatar(responseData.data))
    } catch (error) {
        AxiosToastError(error)
    } finally{
        setLoading(false)
    }
  }
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center">
      <div className="bg-white max-w-sm  w-full rounded p-4 flex flex-col items-center justify-center">
        <div className="w-20 h-20 flex items-center justify-center rounded-full overflow-hidden border-2-slate-800 drop-shadow-sm">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full" />
          ) : (
            <FaRegUserCircle size={65} />
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="uploadProfile">
            <div className="border border-primary-200 hover:bg-primary-200 px-4 py-1 rounded text-sm my-3">
              {
                loading ? "Loading..." : "Upload"
              }
            </div>
          </label>
          <input onChange={handleUploadAvatarImage} type="file" id="uploadProfile" className="hidden" />
        </form>
      </div>
    </section>
  );
};

export default UserProfileAvatarEdit;
