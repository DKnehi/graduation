import { Button, message } from "antd";
import React from "react";
import { cart } from "../api";

export default function CartCard({ dataCart, handelReload }) {
  const handelDeleteCart = (id) => {
    cart
      .deleteCart(id)
      .then(() => {
        message.success("đã xóa");
        handelReload();
      })
      .catch((error) => {
        console.error(error);
        message.error("Lỗi giỏ hàng!");
      });
  };

  return (
    <div>
      <div className="cart-content-card">
        <div className="cart-content-card-imgbox">
          <img src={dataCart?.courseShema?.course_thumnail} alt="" />
          <p>{dataCart?.courseShema?.course_name}</p>
        </div>

        <div className="cart-content-card-price">
          <p>{dataCart?.courseShema?.course_price} VND</p>
          <Button
            onClick={() => handelDeleteCart(dataCart?._id)}
            type="primary"
          >
            Xóa
          </Button>
        </div>
      </div>
    </div>
  );
}

