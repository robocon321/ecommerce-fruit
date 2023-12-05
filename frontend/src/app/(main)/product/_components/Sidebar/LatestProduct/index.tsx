import { cacheProductsByCategories } from "@/utils/product-cache";
import { use } from "react";
import ProductCard from "./ProductCard";

export default function LatestProduct(props: any) {
  const latestProducts = use(
    cacheProductsByCategories([], {
      size: 6,
      sortBy: ["createdAt"],
      sortType: ["DESC"],
    })
  );

  return (
    <div className="sidebar__item">
      <div className="latest-product__text">
        <h4>Latest Products</h4>
        <div className="latest-product__slider owl-carousel">
          <div className="latest-prdouct__slider__item">
            {
              latestProducts.map(item => (
                <ProductCard key={item.id} {...item} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}
