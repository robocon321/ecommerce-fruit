import { errorToast, infoToast } from "@/utils/toast";
import { useCallback, useContext, useMemo, useState } from "react";
import {
  DetailProductContext,
  DetailProductContextType,
} from "../../_provider/DetailProductProvider";
import ImageSlider from "./ImageSlider";
import RatingForm from "./RatingForm";
import RatingList from "./RatingList";
import { MainContext, MainContextType } from "@/app/(main)/_provider/MainProvider";
import { saveCart } from "@/services/CartService";
import { removeWishlist, saveWishlist } from "@/services/WishlistService";
import { CartInfoResponse } from "@/types/response/CartResponse";

export default function ProductDetailInfo(props: any) {
  const { user, setUser } = useContext(MainContext) as MainContextType;
  const { product } = useContext(
    DetailProductContext
  ) as DetailProductContextType;
  const [additionalIndex, setAdditionalIndex] = useState(0);
  const [cartCount, setCartCount] = useState(1);

  const averageRating = useMemo(() => {
    const sum = product.reviews
      .map((item) => item.star)
      .reduce((previous, current) => {
        return previous + current;
      }, 0);
    return sum / product.reviews.length;
  }, [product.reviews]);

  const isHeart = useMemo(() => {
    return (
      user && user.products_wishlist.map((item) => item.id).includes(product.id)
    );
  }, [user]);

  const onClickHeartButton = useCallback(async () => {
    if (user) {
      if (isHeart) {
        await removeWishlist(product.id)
          .then((response) => {
            setUser({
              ...user,
              products_wishlist: user.products_wishlist.filter(
                (item) => item.id != product.id
              ),
            });
            infoToast("Remove product from wishlist successfully");
          })
          .catch((error) => {
            errorToast(error.message);
          });
      } else {
        await saveWishlist(product.id)
          .then((response) => {
            setUser({
              ...user,
              products_wishlist: [...user.products_wishlist, product],
            });
            infoToast("Add wishlist successfully");
          })
          .catch((error) => {
            errorToast(error.message);
          });
      }
    } else {
      errorToast("You must login");
    }
  }, [user]);

  const onChangeCount = useCallback(
    (count: number) => {
      if (count > product.stock) {
        errorToast("Count > Stock");
        return ;
      }
      if(count <= 0) {
        errorToast("Count <= 0");
        return ;
      }
      setCartCount(count);
    },
    [cartCount]
  );

  const onAddToCart = useCallback(async () => {
    if (user) {
        await saveCart(product.id, cartCount)
          .then((response) => {
            setUser({
              ...user,
              products_cart: [...user.products_cart, {
                ...product,
                cart_info: (response as CartInfoResponse)
              }],
            });
            infoToast("Add cart successfully");
          })
          .catch((error) => {
            errorToast(error.message);
          });
    } else {
      errorToast("You must login");
    }
  }, [cartCount]);

  return (
    <section className="product-details spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <ImageSlider images={product.images} />
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="product__details__text">
              <h3>{product.name}</h3>
              <div className="product__details__rating">
                {Array.from({ length: Math.floor(averageRating) }).map(
                  (item, index) => (
                    <i key={index} className="fa fa-star"></i>
                  )
                )}
                {Math.round(averageRating) != averageRating && (
                  <i className="fa fa-star-half-o"></i>
                )}
                {Array.from({ length: 5 - Math.floor(averageRating) }).map(
                  (item, index) => (
                    <i key={index} className="fa fa-star-o"></i>
                  )
                )}
                <span>({product.reviews.length} reviews)</span>
              </div>
              <div className="product__details__price">
                ${product.sale_price}
              </div>
              <p>{product.short_description}</p>
              <div className="product__details__quantity">
                <div className="quantity">
                  <div className="pro-qty">
                    <span className="dec qtybtn" onClick={() => onChangeCount(cartCount - 1)}>-</span>
                    <input type="number" value={cartCount} onChange={(e) => onChangeCount(parseInt(e.currentTarget.value))} onBlur={(e) => {
                      if(e.currentTarget.value == "") setCartCount(1);
                    }} />
                    <span className="inc qtybtn" onClick={() => onChangeCount(cartCount + 1)}>+</span>
                  </div>
                </div>
              </div>
              <button onClick={() => onAddToCart()} className="primary-btn">
                ADD TO CARD
              </button>
              <span onClick={() => onClickHeartButton()} className={"heart-icon" + (isHeart ? " active" : " ")}>
                <span className="icon_heart_alt"></span>
              </span>
              <ul>
                <li>
                  <b>Stock</b> <span>{product.stock}</span>
                </li>
                <li>
                  <b>Availability</b> <span>In Stock</span>
                </li>
                <li>
                  <b>Shipping</b>{" "}
                  <span>
                    01 day shipping. <samp>Free pickup today</samp>
                  </span>
                </li>
                <li>
                  <b>Weight</b> <span>{product.weight} kg</span>
                </li>
                <li>
                  <b>Share on</b>
                  <div className="share">
                    <a href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-instagram"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-pinterest"></i>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="product__details__tab">
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                  <a
                    className={
                      "nav-link" + (additionalIndex == 0 ? " active" : "")
                    }
                    data-toggle="tab"
                    href="#tabs-1"
                    role="tab"
                    aria-selected="true"
                    onClick={() => setAdditionalIndex(0)}
                  >
                    Description
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={
                      "nav-link" + (additionalIndex == 1 ? " active" : "")
                    }
                    data-toggle="tab"
                    href="#tabs-2"
                    role="tab"
                    aria-selected="false"
                    onClick={() => setAdditionalIndex(1)}
                  >
                    Reviews <span>({product.reviews.length})</span>
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div
                  className={
                    "tab-pane" + (additionalIndex == 0 ? " active" : "")
                  }
                  id="tabs-1"
                  role="tabpanel"
                >
                  <div className="product__details__tab__desc">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: product.long_description,
                      }}
                    ></div>
                  </div>
                </div>
                <div
                  className={
                    "tab-pane" + (additionalIndex == 1 ? " active" : "")
                  }
                  id="tabs-2"
                  role="tabpanel"
                >
                  <div className="product__details__tab__desc">
                    <RatingList />
                    <RatingForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
