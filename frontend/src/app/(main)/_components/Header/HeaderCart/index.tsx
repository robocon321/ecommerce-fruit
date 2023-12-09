"use client";

import {
  MainContext,
  MainContextType,
} from "@/app/(main)/_provider/MainProvider";
import { useContext, useMemo } from "react";

export default function HeaderCart(props: any) {
  const { user } = useContext(MainContext) as MainContextType;
  const sum = useMemo(() => {
    return user?.products_cart.reduce(
      (prev, current) => prev + current.sale_price,
      0
    );
  }, [user]);

  return (
    <div className="header__cart">
      <ul>
        <li>
          {user ? (
            <a href="/wishlist">
              <i className="fa fa-heart"></i>{" "}
              <span>{user.products_wishlist.length}</span>
            </a>
          ) : (
            <a href="/login">
              <i className="fa fa-heart"></i> <span>0</span>
            </a>
          )}
        </li>
        <li>
          {user ? (
            <a href="/cart">
              <i className="fa fa-shopping-bag"></i>{" "}
              <span>{user.products_cart.length}</span>
            </a>
          ) : (
            <a href="/login">
              <i className="fa fa-shopping-bag"></i> <span>0</span>
            </a>
          )}
        </li>
      </ul>
      {user && (
        <div className="header__cart__price">
          item: <span>${sum?.toFixed(2)}</span>
        </div>
      )}
    </div>
  );
}
