import { getDataLocal } from "./getLocalStorage";

export const checkIdExists = (id) => {
  const data = getDataLocal("userInfo");
  return data?.user_course.some((item) => item._id === id);
};

