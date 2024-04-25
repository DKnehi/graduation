const findTypeCourse = (typeCourse, id) => {
  // console.log(typeCourse);
  // Kiểm tra xem typeCourse có tồn tại và không phải là null

  if (typeCourse) {
    const course = typeCourse.find((course) => course?._id === id);
    return course?.type_name;
  } else {
    return "Chưa phân loại ";
  }
};

export default findTypeCourse;
