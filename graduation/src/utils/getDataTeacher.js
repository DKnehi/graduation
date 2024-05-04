import { getInfo } from "../api";

export const getDataTeacher = (id) => {
  // console.log(id);
  try {
    getInfo
      .teacher(id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {}
};
