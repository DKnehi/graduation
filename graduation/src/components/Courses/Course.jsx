import React, { useEffect, useState } from "react";
import { Button, Checkbox, Empty, Input, Select } from "antd";
import CourseCard from "./CourseCard";
import Pagination from "./Pagination";
import { useParams } from "react-router-dom";
import { getAll, getAllCourses, getSearch } from "../../api";
import { useStateValue } from "../../Context/StateProvider";
import TeacherCard from "./TeacherCard";

const { Option } = Select;

export default function () {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 100; // Tổng số trang
  const [data, setData] = useState([]);
  const [{ search }, dispatch] = useStateValue();
  const [type, settype] = useState("course");

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    if (search) {
      getCourseSearch(currentPage, search, type);
    } else {
      getData();
    }
  }, [currentPage, search, type]);

  const getData = () => {
    if (type === "mentor") {
      getAllTeacher(currentPage);
    } else {
      getCourse(currentPage);
    }
  };

  const getAllTeacher = (currentPage) => {
    getAll
      .teacher(currentPage)
      .then((response) => {
        console.log(response?.data?.data);
        setData(response.data.data);
      })
      .catch(() => {
        return null;
      });
  };

  const getCourse = async (currentPage) => {
    try {
      const courses = await getAllCourses(currentPage);
      setData(courses.data.data);
    } catch (error) {
      return null;
    }
  };
  const getCourseSearch = async (currentPage, string, type) => {
    try {
      const courses = await getSearch(currentPage, string, type);
      setData(courses.data.data);
    } catch (error) {
      return null;
    }
  };
  console.log(data);
  return (
    <div>
      <section className="course-section">
        <div className="course-section-content">
          <div className="course-section-content-listchecked">
            <div className="course-section-content-checked">
              <h2
                style={{ color: "grey" }}
                className="course-section-content-checked-heading"
              >
                Lọc theo
              </h2>
              <Select
                defaultValue="course"
                style={{ width: 200, color: "grey" }}
                onChange={(e) => settype(e)}
              >
                <Option style={{ color: "grey" }} value="course">
                  Khóa học{" "}
                </Option>
                <Option style={{ color: "grey" }} value="mentor">
                  Giảng viên
                </Option>
              </Select>
            </div>
          </div>
          <div className="app-container">
            {type === "course" ? (
              <div className="item-list">
                {data.length > 0 ? (
                  <div className="course-section-content-list-card">
                    {data.map((item) => (
                      <CourseCard key={item?._id} data={item} />
                    ))}
                  </div>
                ) : (
                  <div className="course-section-content-none">
                    <Empty description={false} />
                    Không có khóa học
                  </div>
                )}
              </div>
            ) : (
              <div className="item-list">
                {data.length > 0 ? (
                  <div className="course-section-content-list-card">
                    {data.map((item) => (
                      <TeacherCard key={item?._id} data={item} />
                    ))}
                  </div>
                ) : (
                  <div className="course-section-content-none">
                    <Empty description={false} />
                    Không có giảng viên
                  </div>
                )}
              </div>
            )}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
