export const baseURL = "http://localhost:8080";

const SummaryApi = {
  register: {
    url: "/api/user/register",
    method: "post",
  },
  login:{
    url: "/api/user/login",
    method: "post"
  },
  forgotPassword: {
    url: "/api/user/forgot-password",
    method: "put"
  },
  OtpVerification: {
    url: "/api/user/verify-forgot-password-otp",
    method: "put"
  },
  reset_password: {
    url: "/api/user/reset-password",
    method: "put"
  },
  userDetails : {
    url : "/api/user/user-details",
    method : "get"
  },
  logout: {
    url : "/api/user/logout",
    method : "get"
  },
  uploadAvatar :{
    url : "/api/user/upload-avatar",
    method: "put"
  },
  updateUserDetails : {
    url : "/api/user/update-user",
    method : "put"
  },
  
  addCategory: {
    url: "/api/category/add-category",
    method: "post"
  },
  uploadImage: "/api/file/upload",
  method: "post"
};

export default SummaryApi;
