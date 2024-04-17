import axios from "axios";
import useCustomNavigate from "../utils/useCustomNavigate";
import {useNavigate } from "react-router-dom";
const baseURL = "http://52.221.211.77:3000";

const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ------------------------------ login--------------------------------

export const Login = {
  login: (user_email, user_password) => {
    const data = { user_email, user_password };
    const url = `/v1/api/user/login`;
    return axiosClient.post(url, data);
  },
};

// Thêm interceptor cho response
axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const navigate = useNavigate();

    // Nếu response có status code 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      // Chuyển hướng đến trang đăng nhập
      navigate("/login");
    } else {
      // Xử lý các loại lỗi khác (nếu cần)
    }

    return Promise.reject(error);
  }
);
// ------------------------------ đăng ký--------------------------------

export const register = async (user_name, user_email, user_password) => {
  try {
    const data = { user_name, user_email, user_password };
    const url = `/v1/api/user/signup`;
    const res = await axiosClient.post(url, data);
    // console.log(user_email);
    return res;
  } catch (error) {
    return console.log(error);
  }
};
export const activateUser = async (otpCode, activationToken) => {
  try {
    const data = { otpCode, activationToken };
    const url = `/v1/api/user/activate-user`;
    const res = await axiosClient.post(url, data);
    console.log(typeof otpCode, typeof activationToken);
    return res;
  } catch (error) {
    return error.response.data;
  }
};

// ---------------getcourses---------------

export const getOneCourse = async (idOneCourse) => {
  // console.log(idOneCourse);
  try {
    const res = await axios.get(
      `${baseURL}/v1/api/course/get-one-course/${idOneCourse}`
    );
    // console.log(res);
    return res.data;
  } catch (error) {
    return null;
  }
};
//----------------autoCall api-------------
export const getCourseType = async () => {
  try {
    const res = await axios.get(`${baseURL}/v1/api/course/get-all-course-type`);
    // console.log(res);
    return res;
  } catch (error) {
    return null;
  }
};

export const getAllCourses = async (page) => {
  try {
    const res = await axios.get(`${baseURL}/v1/api/course?limit=8&page=${page}`);
    // console.log(res);
    return res; 
  } catch (error) {
    return null;
  }
};
//----------------autoCall api-------------
export const getSearch = async (page,string,type) => {
  try {
    const res = await axios.get(
      `${baseURL}/v1/api/course/search?keySearch=${string}&type=${
        type || "course"
      }&limit=8&page=${page}`
    );
    console.log(page,string,type);
    return res; 
  } catch (error) {
    return null;
  }
};

