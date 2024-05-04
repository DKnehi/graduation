import React, { useEffect, useState } from "react";
import CartCard from "./CartCard";
import { getDataLocal } from "../utils/getLocalStorage";
import { cart, vnPay } from "../api";
import { message } from "antd";

// Function xử lý thanh toán
async function postOrderToServer(orderInfo) {
  try {
    const response = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderInfo),
    });

    if (response.ok) {
      const result = await response.json();
      // Chuyển hướng khách hàng về trang thanh toán
      window.location.href = result.vnp_ReturnUrl;
    } else {
      console.error("Error posting order:", response.statusText);
    }
  } catch (error) {
    console.error("Error posting order:", error);
  }
}

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
        if (data?.data?.data) {
          postOrderToServer({
            // Gửi các thông tin về đơn hàng lên server
            courseId: id,
            price: dataItemCart?.courseShema?.course_price,
            // Thêm các thông tin khác về đơn hàng nếu cần
          });
        }
      })
      .catch((error) => {
        console.error(error);
        message.error("mua lỗi rồi em nhé!");
      });
  };

  return (
    <div>
      <section className="cart-section">
        <div className="cart-content">
          <h2>Danh sách khóa học muốn mua</h2>
          <div className="cart-content-list">
            {dataCart?.length === 0
              ? "Giỏ hàng trống"
              : dataCart?.map((item) => (
                  <div onClick={() => handelGetDataItem(item)}>
                    <CartCard
                      key={item._id}
                      dataCart={item}
                      handelReload={handelReload}
                    />
                  </div>
                ))}
          </div>
        </div>
        <div className="summary-content">
          <h2>Summary</h2>
          <div className="summary-box">
            <div className="summary-first">
              <p>Tổng tiền</p>
              <p>{dataItemCart?.courseShema?.course_price}</p>
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
