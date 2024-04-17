import React, { useEffect, useState } from "react";
import { Button, Checkbox, Input, Select } from "antd";
import CourseCard from "./CourseCard";
import Pagination from "./Pagination";
import { useParams } from "react-router-dom";
import { getAllCourses, getSearch } from "../../api";
import { useStateValue } from "../../Context/StateProvider";

const { Option } = Select;

export default function () {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 100; // Tổng số trang
  const [data, setData] = useState([]);
  const [{ search }, dispatch] = useStateValue();
  const [type, settype] = useState()

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    if (search) {
      getCourseSearch(currentPage, search,type);
    } else {
      getCourse(currentPage);
    }
  }, [currentPage, search,type]);

  const getCourse = async (currentPage) => {
    try {
      const courses = await getAllCourses(currentPage);
      setData(courses.data.data);
      // console.log("Courses:", courses.data.data);
    } catch (error) {
      // console.error("Error fetching course details:", error);
    }
  };
  const getCourseSearch = async (currentPage,string,type) => {
    try {
      const courses = await getSearch(currentPage,string,type);
      setData(courses.data.data);
      // console.log("Courses:", courses.data.data);
    } catch (error) {
      // console.error("Error fetching course details:", error);
    }
  };

  return (
    <div>
      <section className="course-section">
        {/* <div className="course-section-search-find-box">
          <Select defaultValue="Release Date" style={{ width: 200 }}>
            <Option value="newest">Release Date (newest first)</Option>
            <Option value="oldest">Release Date (oldest first)</Option>
          </Select>
        </div> */}
        <div className="course-section-content">
          <div className="course-section-content-listchecked">
            <div className="course-section-content-checked">
              <h2 className="course-section-content-checked-heading">
                Lọc theo
              </h2>
              <Select defaultValue="course"  style={{ width: 200 }} onChange={(e)=> settype(e)}>
                <Option value="course">Khóa học </Option>
                <Option value="instructor">Giảng viên</Option>
              </Select>
            </div>
            <div className="course-section-content-checked">
              <h2 className="course-section-content-checked-heading">
                Category
              </h2>
              <Checkbox>Art</Checkbox>
            </div>
            <div className="course-section-content-checked">
              <h2 className="course-section-content-checked-heading">Level</h2>
              <Checkbox>All Levels</Checkbox>
            </div>
            <div className="course-section-content-checked">
              <h2 className="course-section-content-checked-heading">Price</h2>
              <Checkbox>Free</Checkbox>
            </div>
          </div>

          <div className="app-container">
            {/* Hiển thị danh sách các item trên trang */}
            <div className="item-list">
              {/* Thực hiện hiển thị dữ liệu của trang tại đây */}
              {data.length > 0 ? (
                <div className="course-section-content-list-card">
                  {data.map((item) => (
                    <CourseCard key={item?._id} data={item} />
                  ))}
                </div>
              ) : (
                <div>Không có khóa học</div>
              )}
            </div>
            {/* Hiển thị component phân trang */}
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
