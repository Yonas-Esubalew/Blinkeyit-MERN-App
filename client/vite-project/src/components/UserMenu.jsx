import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Divider from './Divider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { logout } from '../stores/userSlice'
import toast from "react-hot-toast"
import AxiosToastError from '../utils/AxiosToastError'

const UserMenu = ({close}) => {
    const dispatch = useDispatch()
    const user = useSelector((state)=> state.user.data)

    const handleLogout = async ()=> {
        try {
            const response = await  Axios({
                ...SummaryApi.logout

            })
            if(response.data.success){
                close()
                dispatch(logout())
                localStorage.clear()
                toast.success(response.data.message)
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }
  return (
    <div>
        <div className='font-semibold'>
            My Account
        </div>
        <div>
            {user.name || user.mobile}
        </div>
        <Divider/>
        <div className='text-sm grid gap-2'>
            <Link to={""} className='px-2 hover:bg-amber-100'>My Orders</Link>
            <Link to={""} className='px-2 hover:bg-amber-100'>Save Address</Link>
            <button onClick={handleLogout} className='text-left px-2'>Log Out</button>
        </div>
    </div>
  )
}

export default UserMenu