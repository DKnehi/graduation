import { useNavigate } from "react-router-dom";

const useCustomNavigate = () => {
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate("/login");
  };

  return redirectToLogin;
};

export default useCustomNavigate;
