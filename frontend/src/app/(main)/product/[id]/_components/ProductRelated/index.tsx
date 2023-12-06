import ProductCard from "@/components/ProductCard";
import { getProductsByCategories } from "@/services/ProductService";
import CategoryResponse from "@/types/response/CategoryResponse";
import { ProductSummaryResponse } from "@/types/response/ProductResponse";
import { notFound } from "next/navigation";
import { use, useCallback, useEffect, useState } from "react";

type ProductRelatedPropsType = {
  categories: CategoryResponse[];
};

export default function ProductRelated(props: ProductRelatedPropsType) {
  const { categories } = props;
  const categoryIds = categories.map((item) => item.id);
  const [products, setProducts] = useState<ProductSummaryResponse[]>();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = useCallback(async () => {
    try {
      console.log(categoryIds);
      const loadProduct = await getProductsByCategories(categoryIds, { size: 4 });
      setProducts(loadProduct);
    } catch (error) {
      notFound();
    }    
  }, []);

  return (
    <section className="related-product">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title related__product__title">
              <h2>Related Product</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {products && products.map((item) => (
            <div className="col-lg-3 col-md-4 col-sm-6">
              <ProductCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
