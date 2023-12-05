import { cacheProductsByDiscount } from "@/utils/product-cache";
import { use } from "react";
import ProductDiscountSwiper from "./ProductDiscountSwiper";

export default function ProductDiscount(props: any) {
  const topDiscountProduct = use(
    cacheProductsByDiscount({
      size: 12,
    })
  );

  return (
    <div className="product__discount">
      <div className="section-title product__discount__title">
        <h2>Sale Off</h2>
      </div>
      <ProductDiscountSwiper products={topDiscountProduct} />
    </div>
  );
}
