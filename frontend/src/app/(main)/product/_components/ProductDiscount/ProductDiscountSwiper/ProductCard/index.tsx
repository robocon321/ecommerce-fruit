import { ProductDiscountSummaryResponse } from "@/types/response/ProductResponse";

export default function ProductCard(props: ProductDiscountSummaryResponse) {
  return (
    <div className="product__discount__item">
      <div
        className="product__discount__item__pic set-bg"
        style={{
          backgroundImage: `url(${props.images[0]})`,
        }}
      >
        <div className="product__discount__percent">-{Math.ceil(props.discount)}%</div>
        <ul className="product__item__pic__hover">
          <li>
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
      <div className="product__discount__item__text">
        <h5>
          <a href="#">{props.name}</a>
        </h5>
        <div className="product__item__price">
          ${props.sale_price} <span>${props.real_price}</span>
        </div>
      </div>
    </div>
  );
}
