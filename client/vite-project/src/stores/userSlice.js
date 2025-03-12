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
    updateAvatar : (state,action)=> {
      state.avatar = action.payload?.avatar
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { setUserDetails, logout , updateAvatar} = userSlice.actions;
export default userSlice.reducer;
