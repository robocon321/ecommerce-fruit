import ProductCard from "@/components/ProductCard";
import { ProductSummaryResponse } from "@/types/response/ProductResponse";

type ProductListPropsType = {
  products: ProductSummaryResponse[];
};

export default function ProductList(props: ProductListPropsType) {
  const { products } = props;
  return (
    <div className="row">
      {products.map((item) => (
        <div className="col-lg-4 col-md-6 col-sm-6">
          <ProductCard {...item} />
        </div>
      ))}
    </div>
  );
}
