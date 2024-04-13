import "./styles/index.css";

import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./components/Layout";
import { Fragment, useEffect } from "react";
import { getCourseType } from "./api";
import { useStateValue } from "./Context/StateProvider";
import { actionType } from "./Context/reducer";

import Main from "./components/Main";
import Course from "./components/Courses/Course";
import Login from "./components/AuthUser/Login/Login";
import Register from "./components/AuthUser/Register/Register";
import Instructor from "./components/instructor/Instructor";
import Cart from "./components/Cart";
import NewCourse from "./components/CourseDetails/NewCourse";
import Lesson from "./components/Lesson";


const publicRoutes = [
  { path: "/", component: Main },
  { path: "/course", component: Course },
  { path: "/instructor", component: Instructor },

  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/cart", component: Cart },

  { path: "/newcourse", component: NewCourse },
  { path: "/lesson", component: Lesson },
];

function App() {
  const [{ courseType }, dispatch] = useStateValue();
  useEffect(() => {
    fetchCourseType();
  }, []);
  const fetchCourseType = async () => {
    try {
      const res = await getCourseType(); // Gọi API
      // console.log(res.data.data);
      dispatch({
        type: actionType.SET_TYPECOURSE,
        typeCourse: res.data.data,
      });

    } catch (error) {
      // console.error("Error fetching course type:", error);
    }
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
      },
    },
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              let Layout = DefaultLayout;
              // Kiểm tra xem có layout được chỉ định cho route hay không
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }
              // Trả về Route phù hợp với đường dẫn
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
      {/* Hiển thị ToastContainer để hiển thị thông báo */}
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
