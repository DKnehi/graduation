import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseURL = "http://52.221.211.77:3000";

const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getOneCourse = async (idOneCourse) => {
  // console.log(idOneCourse);
  try {
    const req = await axios.get(
      `${baseURL}/v1/api/course/get-one-course/learn/${idOneCourse}`
    );
    // console.log(req);
    return req.data;
  } catch (error) {
    return null;
  }
};
export const getCourseType = async (idCourseType) => {
  try {
    const req = await axios.get(
      `${baseURL}/v1/api/course/get-one-course/${idCourseType}`
    );
    return req;
  } catch (error) {
    return null;
  }
};

// ------------------------------ login--------------------------------

export const Login = {
  login: (user_email, user_password) => {
    const data = { user_email, user_password };
    const url = `/v1/api/user/login`;
    return axiosClient.post(url, data);
  },
};

// Hàm chuyển hướng đến trang đăng nhập
const redirectToLogin = () => {
  const navigate = useNavigate();
  navigate("/login");
};

// Thêm interceptor cho response
axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response.status === 401) {
      // Nếu access token hết hạn, chuyển hướng đến trang đăng nhập
      redirectToLogin();
    }
    return Promise.reject(error);
  }
);
// ------------------------------ đăng ký--------------------------------

export const register = async (user_name, user_email, user_password) => {
  try {
    const data = { user_name, user_email, user_password };
    const url = `/v1/api/user/signup`;
    const res = await axiosClient.post(url,data)
    // console.log(user_email);
    return res;
    
  } catch (error) {
    return console.log(error);;
  }
};
export const activateUser = async (otpCode, activationToken) => {
  try {
    const data = { otpCode, activationToken };
    const url = `/v1/api/user/activate-user`;
    const res = await axiosClient.post(url, data);
    console.log(typeof otpCode, typeof activationToken);;
    return res;
  } catch (error) {
    return error.response.data;
  }
};

// ---------------getallcourses---------------

export const getAllCourses = async () => {
  // console.log(idOneCourse);
  
  try {
    const url = "/v1/api/course?limit=0&page=1";
    console.log(req);
    return req.data;
  } catch (error) {
    return null;
  }
};