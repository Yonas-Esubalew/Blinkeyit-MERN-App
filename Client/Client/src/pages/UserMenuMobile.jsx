import React from 'react'
import UserMenu from '../components/UserMenu'
import { IoMdClose } from "react-icons/io";
const UserMenuMobile = () => {
  return (
    <section className='bg-white h-full w-full py-2'>
        <button onClick={()=>{window.history.back()}} className='text-slate-800 block w-fit ml-auto'>
            <IoMdClose size={25}/>
        </button>
        <div className='container px-3 py-5 mx-auto p-3'>
        <UserMenu/>
        </div>
    </section>
  )
}

export default UserMenuMobile