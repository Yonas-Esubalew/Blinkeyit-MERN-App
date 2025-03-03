import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import UserProfileAvatarEdit from "./UserProfileAvatarEdit";
import { useState } from "react";

const Profile = () => {
  const user = useSelector((state) => state.user);
  console.log("user", user);
  const [openProfileAvatarEdit, setOpenProfileAvatarEdit] = useState(false);
  return (
    <div>
        <div className="w-20 h-20 flex items-center justify-center rounded-full overflow-hidden border-2-slate-800 drop-shadow-sm">
      {user.avatar ? (
        <img src={user.avatar} alt={user.name} className="w-full h-full" />
      ) : (
        <FaRegUserCircle size={65} />
      )}
    </div>
    <button onClick={()=>{setOpenProfileAvatarEdit(true)}} className="text-sm border px-3 py-1 rounded-full mt-3 min-w-20 border-primary-100 hover:border-primary-200 hover:bg-primary-200">Edit</button>

{
    openProfileAvatarEdit && (
        <UserProfileAvatarEdit close={()=> setOpenProfileAvatarEdit(false)}/>
    )
}
    </div>
  );
};

export default Profile;
