import {
  cacheProductsByCategories,
  cacheProductsByRatingAverage,
  cacheProductsByRatingCount,
} from "@/utils/product-cache";
import { use } from "react";
import ProductCard from "./ProductCard";

export default function TopProduct(props: any) {
  const lastestProducts = use(
    cacheProductsByCategories([], {
      size: 6,
      sortBy: ["createdAt"],
      sortType: ["DESC"],
    })
  );
  const topRatingCountProducts = use(cacheProductsByRatingCount({ size: 6 }));
  const topRatingAverageProducts = use(
    cacheProductsByRatingAverage({ size: 6 })
  );

  return (
    <section className="latest-product spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="latest-product__text">
              <h4>Latest Products</h4>
              <div className="latest-product__slider owl-carousel">
                {lastestProducts.map((item) => (
                  <ProductCard key={item.id} {...item} />
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="latest-product__text">
              <h4>Top Rated Products</h4>
              <div className="latest-product__slider owl-carousel">
                {topRatingAverageProducts.map((item) => (
                  <ProductCard key={item.id} {...item} />
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="latest-product__text">
              <h4>Review Products</h4>
              <div className="latest-product__slider owl-carousel">
                {topRatingCountProducts.map((item) => (
                  <ProductCard key={item.id} {...item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
