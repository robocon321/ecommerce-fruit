import { ProductDetailResponse } from "@/types/response/ProductResponse";
import ImageSlider from "./ImageSlider";

type ProductDetailInfoPropsType = {
  product: ProductDetailResponse;
};

export default function ProductDetailInfo(props: ProductDetailInfoPropsType) {
  const { product } = props;

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
                {Array.from({ length: Math.floor(product.rating_avg) }).map(
                  (item, index) => (
                    <i key={index} className="fa fa-star"></i>
                  )
                )}
                {Array.from({ length: 5 - Math.floor(product.rating_avg) }).map(
                  (item, index) => (
                    <i key={index} className="fa fa-star-o"></i>
                  )
                )}
                {Math.round(product.rating_avg) != product.rating_avg && (
                  <i className="fa fa-star-half-o"></i>
                )}
                <span>({product.rating_count} reviews)</span>
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
                    className="nav-link active"
                    data-toggle="tab"
                    href="#tabs-1"
                    role="tab"
                    aria-selected="true"
                  >
                    Description
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#tabs-3"
                    role="tab"
                    aria-selected="false"
                  >
                    Reviews <span>({product.rating_count})</span>
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div className="tab-pane active" id="tabs-1" role="tabpanel">
                  <div className="product__details__tab__desc">
                    <h6>Products Infomation</h6>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: product.long_description,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="tab-pane" id="tabs-2" role="tabpanel">
                  <div className="product__details__tab__desc">
                    <p>
                      Vestibulum ac diam sit amet quam vehicula elementum sed
                      sit amet dui. Pellentesque in ipsum id orci porta dapibus.
                      Proin eget tortor risus. Vivamus suscipit tortor eget
                      felis porttitor volutpat. Vestibulum ac diam sit amet quam
                      vehicula elementum sed sit amet dui. Donec rutrum congue
                      leo eget malesuada. Vivamus suscipit tortor eget felis
                      porttitor volutpat. Curabitur arcu erat, accumsan id
                      imperdiet et, porttitor at sem. Praesent sapien massa,
                      convallis a pellentesque nec, egestas non nisi. Vestibulum
                      ac diam sit amet quam vehicula elementum sed sit amet dui.
                      Vestibulum ante ipsum primis in faucibus orci luctus et
                      ultrices posuere cubilia Curae; Donec velit neque, auctor
                      sit amet aliquam vel, ullamcorper sit amet ligula. Proin
                      eget tortor risus.
                    </p>
                    <p>
                      Praesent sapien massa, convallis a pellentesque nec,
                      egestas non nisi. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Mauris blandit aliquet elit, eget
                      tincidunt nibh pulvinar a. Cras ultricies ligula sed magna
                      dictum porta. Cras ultricies ligula sed magna dictum
                      porta. Sed porttitor lectus nibh. Mauris blandit aliquet
                      elit, eget tincidunt nibh pulvinar a.
                    </p>
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
