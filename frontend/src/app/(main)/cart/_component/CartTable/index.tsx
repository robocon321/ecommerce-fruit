import { useContext } from "react";
import { CartContext, CartContextType } from "../../_provider/CartProvider";
import CartRow from "./CartRow";

export default function CartTable(props: any) {
    const { carts } = useContext(CartContext) as CartContextType;

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="shoping__cart__table">
          <table>
            <thead>
              <tr>
                <th className="shoping__product">Products</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
                {
                    carts.map(item => <CartRow key={item.id} {...item} />)
                }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
