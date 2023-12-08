"use client";

import {
  MainContext,
  MainContextType,
} from "@/app/(main)/_provider/MainProvider";
import { useContext } from "react";

export default function HeaderCart(props: any) {
  const { user } = useContext(MainContext) as MainContextType;

  return (
    <div className="header__cart">
      <ul>
        <li>
          {user ? (
            <a href="/wishlist">
              <i className="fa fa-heart"></i> <span>{user.products_wishlist.length}</span>
            </a>
          ) : (
            <a href="/login">
              <i className="fa fa-heart"></i> <span>0</span>
            </a>
          )}
        </li>
        <li>
          <a href="#">
            <i className="fa fa-shopping-bag"></i> <span>3</span>
          </a>
        </li>
      </ul>
      <div className="header__cart__price">
        item: <span>$150.00</span>
      </div>
    </div>
  );
}
