import { CartProductResponse } from "@/types/response/CartResponse";
import { useContext } from "react";
import { CartContext, CartContextType } from "../../../_provider/CartProvider";
import { errorToast } from "@/utils/toast";

export default function CartRow(props: CartProductResponse) {
  const { carts, setCarts } = useContext(CartContext) as CartContextType;

  const onChangeCount = (count: number) => {
    setCarts(carts.map((item) => {
        if (item.id === props.id) {
          if (count > props.stock) {
            errorToast("Count > Stock");
            return item;
          }
          if (count <= 0) {
            errorToast("Count <= 0");
            return item;
          }

          return {
            ...props,
            cart_info: {
              ...props.cart_info,
              quantity: count,
            },
          };
        }
        return item;
      }));
  };
  return (
    <tr>
      <td className="shoping__cart__item">
        <img src={props.images[0]} alt="" />
        <h5>{props.name}</h5>
      </td>
      <td className="shoping__cart__price">${props.sale_price}</td>
      <td className="shoping__cart__quantity">
        <div className="quantity">
          <div className="pro-qty">
            <input
              type="number"
              value={props.cart_info.quantity}
              onChange={(e) => onChangeCount(parseInt(e.currentTarget.value))}
              onBlur={(e) => {
                if (e.currentTarget.value == "") onChangeCount(1);
              }}
            />
          </div>
        </div>
      </td>
      <td className="shoping__cart__total">
        ${(props.cart_info.quantity * props.sale_price).toFixed(2)}
      </td>
      <td className="shoping__cart__item__close">
        <span
          className="icon_close"
          onClick={() => setCarts(carts.filter((item) => item.id != props.id))}
        ></span>
      </td>
    </tr>
  );
}
