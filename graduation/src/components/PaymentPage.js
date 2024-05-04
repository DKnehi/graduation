import React, { useEffect } from "react";

const PaymentPage = () => {
  useEffect(() => {
    // Phân tích URL và trích xuất thông tin cần thiết
    const urlParams = new URLSearchParams(window.location.search);
    const returnUrl = urlParams.get("vnp_ReturnUrl");

    // Chuyển hướng người dùng đến trang thanh toán của VNPAY
    if (returnUrl) {
      window.location.href = returnUrl;
    }
  }, []);

  return <div>Loading...</div>;
};

export default PaymentPage;
