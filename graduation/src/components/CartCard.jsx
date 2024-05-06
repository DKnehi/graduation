import { Button, message, Rate } from "antd";
import React from "react";
import { cart } from "../api";
import { FaUserEdit } from "react-icons/fa";
import findTypeCourse from "../utils/findTypeCourse";
import { useStateValue } from "../Context/StateProvider";

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
  const formatPrice = (price) => {
    if (typeof price !== "undefined" && price !== null) {
      return price.toLocaleString("vi-VN");
    }
    return "";
  };
  const [{ typeCourse }, dispatch] = useStateValue();
  return (
    <div>
      <div className="cart-content-card">
        <div className="cart-content-card-imgbox">
          <img src={dataCart?.courseShema?.course_thumnail} alt="" />
          <div
            style={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <p
              style={{ fontSize: "18px", color: "#4096ff", fontWeight: "500" }}
            >
              {dataCart?.courseShema?.course_name}
            </p>
            <Rate
              disabled
              allowHalf
              defaultValue={dataCart?.courseShema?.course_ratingsAverage}
            />
            <div className="" style={{ display: "flex", gap: "10px" }}>
              <FaUserEdit />
              <div>{dataCart?.courseShema?.course_purchased}</div>
            </div>
            <div className="">
              Thể loại:{" "}
              {findTypeCourse(typeCourse, dataCart?.courseShema?.course_type)}
            </div>
          </div>
        </div>

        <div className="cart-content-card-price">
          <p>{formatPrice(dataCart?.courseShema?.course_price)} VND</p>
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
