import { useContext } from "react";
import WishlistRow from "./WishlistRow";
import { MainContext, MainContextType } from "@/app/(main)/_provider/MainProvider";

export default function WishlistTable(props: any) {
  const { user } = useContext(MainContext) as MainContextType;

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="shoping__cart__table">
          <table>
            <thead>
              <tr>
                <th className="shoping__product">Products</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
                {
                    user?.products_wishlist.map(item => <WishlistRow key={item.id} {...item} />)
                }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
