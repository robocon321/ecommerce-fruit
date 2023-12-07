import { ProductDetailResponse } from "@/types/response/ProductResponse";
import ImageSlider from "./ImageSlider";
import { useMemo, useState } from "react";
import RatingForm from "./RatingForm";
import RatingList from "./RatingList";

type ProductDetailInfoPropsType = {
  product: ProductDetailResponse;
};

export default function ProductDetailInfo(props: ProductDetailInfoPropsType) {
  const { product } = props;
  const [additionalIndex, setAdditionalIndex] = useState(0);

  const averageRating = useMemo(() => {
    const sum = product.reviews.map(item => item.star).reduce((previous, current) => {
      return previous + current;
    }, 0);
    return sum / product.reviews.length;
  }, [product.reviews]);

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
                    <input type="text" value={product.stock} />
                  </div>
                </div>
              </div>
              <a href="#" className="primary-btn">
                ADD TO CARD
              </a>
              <a href="#" className="heart-icon">
                <span className="icon_heart_alt"></span>
              </a>
              <ul>
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
                    className={"nav-link" + (additionalIndex == 0 ? " active" : "")}
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
                    className={"nav-link" + (additionalIndex == 1 ? " active" : "")}
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
                <div className={"tab-pane" + (additionalIndex == 0 ? " active" : "")} id="tabs-1" role="tabpanel">
                  <div className="product__details__tab__desc">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: product.long_description,
                      }}
                    ></div>
                  </div>
                </div>
                <div className={"tab-pane" + (additionalIndex == 1 ? " active" : "")} id="tabs-2" role="tabpanel">
                  <div className="product__details__tab__desc">
                      <RatingList reviews={product.reviews} />
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
