import React, { useEffect, useRef, useState } from "react";
import CartCard from "./CartCard";
import { getDataLocal } from "../utils/getLocalStorage";
import { cart, vnPay } from "../api";
import { Empty, message } from "antd";
import { Route, useNavigate } from "react-router-dom";

export default function Cart() {
  const [dataCart, setdataCart] = useState(null);
  const [reloaData, setreloaData] = useState(false);
  useEffect(() => {
    handelGetCart();
  }, [reloaData]);

  const handelReload = () => {
    setreloaData(!reloaData);
  };

  const handelGetCart = () => {
    cart
      .getCart()
      .then((data) => {
        setdataCart(data?.data?.data);
      })
      .catch((error) => {
        console.error(error);
        message.error("Lỗi giỏ hàng!");
      });
  };
  const navigate = useNavigate();
  const [dataItemCart, setdataItemCart] = useState();

  const handelGetDataItem = (data) => {
    setdataItemCart(data);
  };

  const handelBuyCourse = (id) => {
    vnPay
      .buy(id)
      .then((data) => {
        console.log(data.data.data);
        // Xử lý thanh toán khi nhận được URL từ vnPay.buy
        window.open(data.data.data, "_blank");
      })
      .catch((error) => {
        console.error(error);
        message.error("Không thể thực hiện!");
      });
  };
  const formatPrice = (price) => {
    if (typeof price !== "undefined" && price !== null) {
      return price.toLocaleString("vi-VN");
    }
    return "";
  };

  return (
    <div>
      <section className="cart-section">
        <div className="cart-content">
          <h2>Danh sách khóa học muốn mua</h2>
          <div className="cart-content-list">
            {dataCart?.length === 0 ? (
              <div className="course-section-content-none">
                <Empty description={false} />
                Danh sách trống!
              </div>
            ) : (
              dataCart?.map((item) => (
                <div className="" onClick={() => handelGetDataItem(item)}>
                  <CartCard
                    key={item._id}
                    dataCart={item}
                    handelReload={handelReload}
                  />
                </div>
              ))
            )}
          </div>
        </div>
        <div className="summary-content">
          <h2>Summary</h2>
          <div className="summary-box">
            <div className="summary-first">
              <p>Tổng tiền</p>
              <p>{formatPrice(dataItemCart?.courseShema?.course_price)}</p>
            </div>
            <div>
              <button
                onClick={() => handelBuyCourse(dataItemCart?.courseShema?._id)}
                className="vnpay-checkout"
              >
                <img
                  src="https://asset.brandfetch.io/idV02t6WJs/idyWhNall8.svg"
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
