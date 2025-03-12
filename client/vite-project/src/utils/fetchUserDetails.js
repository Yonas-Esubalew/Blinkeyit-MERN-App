import SummaryApi from "../common/SummaryApi"
import Axios from './Axios'
import AxiosToastError from "./AxiosToastError"


const fetchUserDetails = async ()=> {
    try {
        const response = await Axios({
            ...SummaryApi.userDetails
        })
        return response
    } catch (error) {
        AxiosToastError(error)
    }
}

export default fetchUserDetails