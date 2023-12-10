import { MainContext, MainContextType } from "@/app/(main)/_provider/MainProvider";
import { useCallback, useContext, useMemo } from "react";
import { CartContext, CartContextType } from "../../_provider/CartProvider";
import { updateMultiCart } from "@/services/CartService";
import { errorToast, infoToast } from "@/utils/toast";

export default function CartControl(props: any) {
  const { user, setUser } = useContext(MainContext) as MainContextType;
  const { carts, setIsLoading } = useContext(CartContext) as CartContextType;

  const total = useMemo(() => {
    if(user) {
      return user.products_cart.reduce((prev, current) => prev + current.sale_price * current.cart_info.quantity, 0).toFixed(2);
    } else { 
      return 0;
    }
  }, [user]);

  const onUpdateCart = useCallback(async () => {
    if(user) {
      setIsLoading(true);
      await updateMultiCart(carts.map(item => ({
        product_id: item.id,
        quantity: item.cart_info.quantity
      })))
      .then(response => {
        infoToast("Update Successfully!");
        setUser({
          ...user,
          products_cart: carts
        });
      })
      .catch(error => {
        errorToast(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      })

    }
  }, [user, carts]);

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="shoping__cart__btns">
          <a href="#" className="primary-btn cart-btn">
            CONTINUE SHOPPING
          </a>
          <div onClick={() => onUpdateCart()} className="primary-btn cart-btn cart-btn-right">
            Update Cart
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="shoping__continue">
          <div className="shoping__discount">
            <h5>Discount Codes</h5>
            <form action="#">
              <input type="text" placeholder="Enter your coupon code" />
              <button type="submit" className="site-btn">
                APPLY COUPON
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="shoping__checkout">
          <h5>Cart Total</h5>
          <ul>
            <li>
              Subtotal <span>${total}</span>
            </li>
            <li>
              Total <span>${total}</span>
            </li>
          </ul>
          <a href="#" className="primary-btn">
            PROCEED TO CHECKOUT
          </a>
        </div>
      </div>
    </div>
  );
}
