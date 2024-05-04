import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const VnPayReturnPage = () => {
  const history = useHistory();

  useEffect(() => {
    // Phân tích URL callback và trích xuất thông tin thanh toán thành công
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get("paymentStatus");

    // Xử lý thông tin thanh toán thành công
    if (paymentStatus === "success") {
      // Cập nhật trạng thái đơn hàng hoặc lưu trữ thông tin thanh toán

      // Điều hướng người dùng trở lại màn hình ứng dụng
      history.push("/order/success"); // Điều hướng đến trang thông báo thanh toán thành công
    } else {
      // Xử lý trường hợp thanh toán không thành công (nếu cần)
      history.push("/order/failure"); // Điều hướng đến trang thông báo thanh toán thất bại
    }
  }, [history]);

  return <div>Loading...</div>;
};

export default VnPayReturnPage;
