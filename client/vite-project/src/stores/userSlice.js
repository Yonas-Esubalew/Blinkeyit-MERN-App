import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  name: "",
  email: "",
  avatar: "",
  verify_email : "",
  last_login_date : "",
  status : "",
  address_details : [],
  shopping_cart : [],
  orderHistory : [],
  role : ""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
        return {
            ...state,
            ...action.payload
        }
        
    },
    logout: () => {
      return initialState;
    },
  },
});




export const { setUserDetails, logout } = userSlice.actions;
export default userSlice.reducer;
