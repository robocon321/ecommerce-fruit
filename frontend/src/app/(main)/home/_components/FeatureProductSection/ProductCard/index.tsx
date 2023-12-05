import { ProductSummaryResponse } from "@/types/response/ProductResponse";

export default function ProductCard(props: ProductSummaryResponse) {
  return (
    <div className="featured__item">
      <div
        className="featured__item__pic set-bg"
        style={{ backgroundImage: `url(${props.images[0]})` }}
      >
        <ul className="featured__item__pic__hover">
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
      <div className="featured__item__text">
        <h6>
          <a href="#">{props.name}</a>
        </h6>
        <h5>${props.sale_price}</h5>
      </div>
    </div>
  );
}
