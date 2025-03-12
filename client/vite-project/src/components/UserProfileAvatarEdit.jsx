import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import { updateAvatar } from "../stores/userSlice";
import { IoClose } from "react-icons/io5";

const UserProfileAvatarEdit = ({close}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.data)
    const [loading,setLoading] = useState(false)
    const handleSubmit = (e)=>{
        e.preventDefault()
    }

    const handleUploadAvatarImage = async(e)=>{
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append("avatar", file)

        try {
            const response = await Axios({
                ...SummaryApi.uploadAvatar,
                data : formData
            })
            const {data : responseData} = response
            dispatch(updateAvatar(responseData.data, avatar))
        } catch (error) {
            AxiosToastError(error)
        } finally{
            setLoading(false)
        }
        
    }
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-800 opacity-60 p-4 flex items-center justify-center">
      <div className="bg-white text-center items-center justify-center  max-w-sm w-full rounded p-4">
        <button onClick={close} className="text-neutral-800 w-fit bloc k ml-auto">
            <IoClose/>
        </button>
        <div className='w-20 h-20 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
                {
                  user.avatar ? (
                    <img alt={user.name} src={user.avatar} className='w-full h-full '/>
                  ) : (
                    <FaRegUserCircle size={50}/>
                  )
                }
              </div>
              <form onSubmit={handleSubmit}>
                <label htmlFor="uploadProfile">
                <div className="border border-amber-400 hover:bg-amber-500 px-4 py-1 rounded text-sm my-3">
                    {
                        loading ? "Loading..." : "Upload"
                    }
                </div>
                <input onChange={handleUploadAvatarImage} className="hidden" id="uploadProfile" type="file"/>
                </label>
              </form>
      </div>
    </section>
  );
};

export default UserProfileAvatarEdit;
