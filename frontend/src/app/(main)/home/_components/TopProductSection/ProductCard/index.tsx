import { ProductSummaryResponse } from "@/types/response/ProductResponse";

export default function ProductCard(props: ProductSummaryResponse) {
    return (
        <a href="#" className="latest-product__item">
        <div className="latest-product__item__pic">
          <img src={props.images[0]} alt="" />
        </div>
        <div className="latest-product__item__text">
          <h6>{props.name}</h6>
          <span>${props.sale_price}</span>
        </div>
      </a>
    )
}