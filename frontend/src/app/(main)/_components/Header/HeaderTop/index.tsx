"use client";

import {
  MainContext,
  MainContextType,
} from "@/app/(main)/_provider/MainProvider";
import { useContext } from "react";

export default function HeaderTop(props: any) {
  const { user } = useContext(MainContext) as MainContextType;
  return (
    <div className="header__top">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="header__top__left">
              <ul>
                <li>
                  <i className="fa fa-envelope"></i> hello@robocon321.com
                </li>
                <li>Free Shipping for all Order of $99</li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="header__top__right">
              <div className="header__top__right__social">
                <a href="#">
                  <i className="fa fa-facebook"></i>
                </a>
                <a href="#">
                  <i className="fa fa-twitter"></i>
                </a>
                <a href="#">
                  <i className="fa fa-linkedin"></i>
                </a>
                <a href="#">
                  <i className="fa fa-pinterest-p"></i>
                </a>
              </div>
              <div className="header__top__right__language">
                <img src="img/language.png" alt="" />
                <div>English</div>
                <span className="arrow_carrot-down"></span>
                <ul>
                  <li>
                    <a href="#">Spanis</a>
                  </li>
                  <li>
                    <a href="#">English</a>
                  </li>
                </ul>
              </div>
              <div className="header__top__right__auth">
                {user ? (
                  <a href="#">
                    <i className="fa fa-user"></i> {user.username}
                  </a>
                ) : (
                  <a href="/login">
                    <i className="fa fa-user"></i> Login
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
