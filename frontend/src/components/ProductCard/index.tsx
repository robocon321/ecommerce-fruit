import {
  MainContext,
  MainContextType,
} from "@/app/(main)/_provider/MainProvider";
import { removeWishlist, saveWishlist } from "@/services/WishlistService";
import { ProductSummaryResponse } from "@/types/response/ProductResponse";
import { useCallback, useContext, useMemo } from "react";
import { toast } from "react-toastify";

export default function ProductCard(props: ProductSummaryResponse) {
  const { user, setUser } = useContext(MainContext) as MainContextType;
  const isHeart = useMemo(() => {
    return (
      user && user.products_wishlist.map((item) => item.id).includes(props.id)
    );
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

  return (
    <div className="featured__item">
      <div
        className="featured__item__pic set-bg"
        style={{ backgroundImage: `url(${props.images[0]})` }}
      >
        <ul className="featured__item__pic__hover">
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
          <li>
            <a href="#">
              <i className="fa fa-shopping-cart"></i>
            </a>
          </li>
        </ul>
      </div>
      <div className="featured__item__text">
        <h6>
          <a href={"/product/" + props.id}>{props.name}</a>
        </h6>
        <h5>${props.sale_price}</h5>
      </div>
    </div>
  );
}
