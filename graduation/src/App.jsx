import "./styles/index.css";

import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./components/Layout";
import { Fragment } from "react";

import Main from "./components/Main"
import Course from "./components/Courses/Course";
import Login from "./components/Login";
import Register from "./components/Register";

const publicRoutes = [
  { path: "/", component: Main },
  { path: "/course", component: Course },

  { path: "/login", component: Login },
  { path: "/register", component: Register },
];

function App() {
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
