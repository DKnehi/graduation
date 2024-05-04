import axios from "axios";
// import useCustomNavigate from "../utils/useCustomNavigate";
import { useNavigate } from "react-router-dom";
const baseURL = "http://52.221.211.77:3000";

const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
const jsonString = localStorage.getItem("user");
const user = JSON.parse(jsonString);
const accessToken = user?.accessToken;
const idUser = user?.metaData?._id;
// ------------------------------ login--------------------------------

export const Login = {
  login: (user_email, user_password) => {
    const data = { user_email, user_password };
    const url = `/v1/api/user/login`;
    return axiosClient.post(url, data);
  },
  getInfo: (idUser, token) => {
    const url = `/v1/api/user/information`;
    return axiosClient.get(url, {
      headers: {
        "x-client-id": idUser,
        "x-atoken-id": token,
      },
    });
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
    // console.log(typeof otpCode, typeof activationToken);
    return res;
  } catch (error) {
    return error;
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

export const getOneCourseMember = async (idOneCourse) => {
  try {
    const res = await axiosClient.get(
      `/v1/api/course/get-one-course/learn/${idOneCourse}`,
      {
        headers: {
          "x-client-id": idUser,
          "x-atoken-id": accessToken,
        },
      }
    );
    // console.log(clientId,accessToken);
    return res;
  } catch (error) {
    return console.log(error);
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
    const res = await axios.get(
      `${baseURL}/v1/api/course//get-all-course?limit=9&page=${page}`
    );
    // console.log(res);
    return res;
  } catch (error) {
    return null;
  }
};
//----------------autoCall api-------------
export const getSearch = async (page, string, type) => {
  try {
    const res = await axios.get(
      `${baseURL}/v1/api/course/search?keySearch=${string}&type=${
        type || "course"
      }&limit=8&page=${page}`
    );
    // console.log(page, string, type);
    return res;
  } catch (error) {
    return null;
  }
};

//---------------- get review
export const ReviewsAPI = {
  getReview: (id, page) => {
    const url = `${baseURL}/v1/api/feedback/get-review/${id}?page=${page}&limit=5`;
    return axios.get(url);
  },
  addReview: async (idUser, idCourse, token, reviewRate, reviewCm) => {
    try {
      const url = `${baseURL}/v1/api/feedback/review/${idCourse}`;
      const res = await axios.post(
        url,
        {
          review_rating: reviewRate,
          review_comment: reviewCm,
        },
        {
          headers: {
            "x-client-id": idUser,
            "x-atoken-id": token,
          },
        }
      );
      console.log("====================================");
      console.log(idUser, idCourse, token, reviewRate, reviewCm);
      console.log("====================================");
      return res;
    } catch (error) {
      return error;
    }
  },
  addReplyReview: (idUser, idCm, token, courseId, replyText) => {
    const url = `${baseURL}/v1/api/feedback/reply-review/${idCm}`;
    return axios.post(
      url,
      {
        courseId: courseId,
        reply_comment: replyText,
      },
      {
        headers: {
          "x-client-id": idUser,
          "x-atoken-id": token,
        },
      }
    );
  },
};

export const upload = {
  uploadImg: (formData) => {
    const url = `${baseURL}/v1/api/upload-images`;
    return axios.post(
      url,
      { imgaes: formData },
      {
        headers: {
          "Content-Type": `multipart/form-data;`,
          "x-client-id": idUser,
          "x-atoken-id": accessToken,
          //
        },
      }
    );
  },
  uploadVideo: (formData) => {
    const url = `${baseURL}/v1/api/upload-video`;
    return axios.post(
      url,
      { video: formData },
      {
        headers: {
          "Content-Type": `multipart/form-data;`,
          "x-client-id": idUser,
          "x-atoken-id": accessToken,
          //
        },
      }
    );
  },
  submitCourse: (objData) => {
    const url = `${baseURL}/v1/api/course/create-course`;
    console.log(objData);
    return axios.post(url, objData, {
      headers: {
        "x-client-id": idUser,
        "x-atoken-id": accessToken,
      },
    });
  },
};

export const Info = {
  teacher: (id) => {
    // console.log(typeof id);
    return axios.get(`${baseURL}/v1/api/user/information-teacher/${id}`);
  },
  user: () => {
    return axios.get(`${baseURL}/v1/api/user/information`, {
      headers: {
        "x-client-id": idUser,
        "x-atoken-id": accessToken,
      },
    });
  },
  chargePass: (oldPass, newPass) => {
    return axios.patch(
      `${baseURL}/v1/api/user/update-password`,
      {
        old_passWord: oldPass,
        new_passWord: newPass,
      },
      {
        headers: {
          "x-client-id": idUser,
          "x-atoken-id": accessToken,
        },
      }
    );
  },
  updatPrf: (obj) => {
    console.log(obj);
    return axios.patch(`${baseURL}/v1/api/user/update-profile`, obj, {
      headers: {
        "x-client-id": idUser,
        "x-atoken-id": accessToken,
      },
    });
  },
};

export const getInfoTeacher = async (id) => {
  try {
    const res = await axios.get(
      `${baseURL}/v1/api/user/information-teacher/${id}`
    );
    return res;
  } catch (error) {
    return null;
  }
};

export const CreateCourseData = {
  title: (id, title) => {
    console.log(id, title);
    return axios.post(
      `${baseURL}/v1/api/course/create-course-data/${id}`,
      {
        courseData_title: title,
      },
      {
        headers: {
          "x-client-id": idUser,
          "x-atoken-id": accessToken,
        },
      }
    );
  },
  createCourseVideo: (id, title, url, time) => {
    console.log(id, title, url, time);
    return axios.post(
      `${baseURL}/v1/api/course/create-course-video/${id}`,
      {
        video_title: title,
        video_url: url,
        video_length: time,
      },
      {
        headers: {
          "x-client-id": idUser,
          "x-atoken-id": accessToken,
        },
      }
    );
  },
};

export const cart = {
  getCart: () => {
    return axios.get(`${baseURL}/v1/api/cart`, {
      headers: {
        "x-client-id": idUser,
        "x-atoken-id": accessToken,
      },
    });
  },
  addCart: (idCourse) => {
    return axios.post(`${baseURL}/v1/api/cart/${idCourse}`, null, {
      headers: {
        "x-client-id": idUser,
        "x-atoken-id": accessToken,
      },
    });
  },
  deleteCart: (idCourse) => {
    return axios.delete(`${baseURL}/v1/api/cart/${idCourse}`, {
      headers: {
        "x-client-id": idUser,
        "x-atoken-id": accessToken,
      },
    });
  },
};

export const vnPay = {
  buy: (id) => {
    return axios.get(
      `${baseURL}/v1/api/create-order/payment/create_payment_url/${id}`,
      null,
      {
        headers: {
          "x-client-id": idUser,
          "x-atoken-id": accessToken,
        },
      }
    );
  },
};
export const Course = {
  byTeacher: (id, page) => {
    return axios.get(
      `${baseURL}/v1/api/user/all-course-teacher/${id}?limit=5&page=${page}`
    );
  },
  userEnrolled: () => {
    return axios.get(`${baseURL}/v1/api/user/get-purchased-course`, {
      headers: {
        "x-client-id": idUser,
        "x-atoken-id": accessToken,
      },
    });
  },
};

export const Process = {
  upProcess: (idCourse, idVideo) => {
    return axios.post(
      `${baseURL}/v1/api/course/update-process-learn/${idCourse}`,
      {
        video_shema: idVideo,
      },
      {
        headers: {
          "x-client-id": idUser,
          "x-atoken-id": accessToken,
        },
      }
    );
  },
};
export const type = {
  addType: (textType) => {
    return axios.post(
      `${baseURL}/v1/api/course/create-type`,
      {
        type_name: textType,
      },
      {
        headers: {
          "x-client-id": idUser,
          "x-atoken-id": accessToken,
        },
      }
    );
  },
};
export const Question = {
  getQuestion: (idVideo) => {
    return axios.get(`${baseURL}/v1/api/feedback/get-question/${idVideo}`, {
      headers: {
        "x-client-id": idUser,
        "x-atoken-id": accessToken,
      },
    });
  },
  addQuestion: (idVideo, time, idCourse, text) => {
    return axios.post(
      `${baseURL}/v1/api/feedback/add-question/${idVideo}`,
      {
        video_time: time,
        courseId: idCourse,
        question_comment: text,
      },
      {
        headers: {
          "x-client-id": idUser,
          "x-atoken-id": accessToken,
        },
      }
    );
  },
  addAnwser: (idCm, text) => {
    return axios.post(
      `${baseURL}/v1/api/feedback/add-anwser/${idCm}`,
      {
        answser_comment: text,
      },
      {
        headers: {
          "x-client-id": idUser,
          "x-atoken-id": accessToken,
        },
      }
    );
  },
};
