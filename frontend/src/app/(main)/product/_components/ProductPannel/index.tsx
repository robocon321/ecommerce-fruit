"use client";

import { useSearchParams } from "next/navigation";
import Filter from "./Filter";
import Pagination from "./Pagination";
import ProductList from "./ProductList";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getProductsPage } from "@/services/ProductService";
import { ProductPageResponse } from "@/types/response/ProductResponse";
import { errorToast } from "@/utils/toast";

export default function ProductPannel(props: any) {
  const searchParams = useSearchParams();
  const [productPage, setProductPage] = useState<ProductPageResponse>();

  useEffect(() => {
    loadData();
  }, [searchParams]);

  const loadData = useCallback(() => {
    getProductsPage(
      searchParams.get("search") || "",
      searchParams.get("range_price") || "0,1000",
      searchParams.get("categoryIds") || "",
      {
        page: parseInt(searchParams.get("page") || "0"),
        size: parseInt(searchParams.get("size") || "12"),
        sortBy: searchParams.get("sortBy")?.split(",") || [],
        sortType:  searchParams.get("sortType")?.split(",") || []
      }
    ).then(response => setProductPage(response))
    .catch(error => errorToast(error.message));
  }, [searchParams]);

  return (
    <>
      {productPage && <Filter itemCount={productPage.itemCount} />}
      {productPage && <ProductList products={productPage.products} />}
      {productPage && <Pagination pageCount={productPage.pageCount} />}
    </>
  );
}
