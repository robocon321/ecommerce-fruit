import {
  MainContext,
  MainContextType,
} from "@/app/(main)/_provider/MainProvider";
import { removeWishlist } from "@/services/WishlistService";
import { ProductSummaryResponse } from "@/types/response/ProductResponse";
import { errorToast, infoToast } from "@/utils/toast";
import { useCallback, useContext } from "react";

export default function WishlistRow(props: ProductSummaryResponse) {
  const { user, setUser } = useContext(MainContext) as MainContextType;
  const onRemoveWishlist = useCallback(async () => {
    if (user) {
      await removeWishlist(props.id)
        .then((response) => {
          setUser({
            ...user,
            products_wishlist: user.products_wishlist.filter(
              (item) => item.id != props.id
            ),
          });
          infoToast("Remove product from wishlist successfully");
        })
        .catch((error) => {
          errorToast(error.message);
        });
    } else {
      errorToast("You must login");
    }
  }, [user]);

  return (
    <tr>
      <td className="shoping__cart__item">
        <img src={props.images[0]} alt="" />
        <h5>{props.name}</h5>
      </td>
      <td className="shoping__cart__price">${props.sale_price}</td>
      <td className="shoping__cart__item__close">
        <span onClick={() => onRemoveWishlist()} className="icon_close"></span>
      </td>
    </tr>
  );
}
