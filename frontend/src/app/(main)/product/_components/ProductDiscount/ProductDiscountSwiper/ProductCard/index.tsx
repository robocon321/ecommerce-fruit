import {
  MainContext,
  MainContextType,
} from "@/app/(main)/_provider/MainProvider";
import { removeWishlist, saveWishlist } from "@/services/WishlistService";
import { useCallback, useContext, useMemo } from "react";
import { toast } from "react-toastify";
import { ProductDiscountSummaryResponse } from "@/types/response/ProductResponse";
import { removeCart, saveCart } from "@/services/CartService";

export default function ProductCard(props: ProductDiscountSummaryResponse) {
  const { user, setUser } = useContext(MainContext) as MainContextType;
  const isHeart = useMemo(() => {
    return (
      user && user.products_wishlist.map((item) => item.id).includes(props.id)
    );
  }, [user]);

  const isCart = useMemo(() => {
    return user && user.products_cart.map((item) => item.id).includes(props.id);
  }, [user]);

  const onClickHeartButton = useCallback(async () => {
    if (user) {
      if (isHeart) {
        await removeWishlist(props.id)
          .then((response) => {
            setUser({
              ...user,
              products_wishlist: user.products_wishlist.filter(
                (item) => item.id != props.id
              ),
            });
            toast.info("Remove product from wishlist successfully", {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          })
          .catch((error) => {
            toast.error(error.message, {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
      } else {
        await saveWishlist(props.id)
          .then((response) => {
            setUser({
              ...user,
              products_wishlist: [...user.products_wishlist, props],
            });
            toast.info("Add wishlist successfully", {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          })
          .catch((error) => {
            toast.error(error.message, {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
      }
    } else {
      toast.error("You must login", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [user]);

  const onClickCartButton = useCallback(async () => {
    if (user) {
      if (isCart) {
        await removeCart(props.id)
          .then((response) => {
            setUser({
              ...user,
              products_cart: user.products_cart.filter(
                (item) => item.id != props.id
              ),
            });
            toast.info("Remove product from cart successfully", {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          })
          .catch((error) => {
            toast.error(error.message, {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
      } else {
        await saveCart(props.id, 1)
          .then((response) => {
            setUser({
              ...user,
              products_cart: [...user.products_cart, props],
            });
            toast.info("Add cart successfully", {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          })
          .catch((error) => {
            toast.error(error.message, {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
      }
    } else {
      toast.error("You must login", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [user]);
  return (
    <div className="product__discount__item">
      <div
        className="product__discount__item__pic set-bg"
        style={{
          backgroundImage: `url(${props.images[0]})`,
        }}
      >
        <div className="product__discount__percent">
          -{Math.ceil(props.discount)}%
        </div>
        <ul className="product__item__pic__hover">
          <li
            onClick={() => onClickHeartButton()}
            className={"" + (isHeart && "active")}
          >
            <a href="#">
              <i className="fa fa-heart"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-retweet"></i>
            </a>
          </li>
          <li
            onClick={() => onClickCartButton()}
            className={"" + (isCart && "active")}
          >
            <a href="#">
              <i className="fa fa-shopping-cart"></i>
            </a>
          </li>
        </ul>
      </div>
      <div className="product__discount__item__text">
        <h5>
          <a href={"/product/" + props.id}>{props.name}</a>
        </h5>
        <div className="product__item__price">
          ${props.sale_price} <span>${props.real_price}</span>
        </div>
      </div>
    </div>
  );
}
