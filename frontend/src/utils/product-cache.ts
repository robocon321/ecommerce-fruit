import { getProductsByCategories } from "@/services/ProductService";
import PageRequest from "@/types/request/PageRequest";
import { ProductSummaryResponse } from "@/types/response/ProductResponse";
import { cache } from "react";

export const cacheProducts = cache(async (categoryIds?: number[], pageRequest?: PageRequest) => {
    let products: ProductSummaryResponse[] = [];
    await getProductsByCategories(categoryIds, pageRequest)
      .then((response) => {
          products = response;
      })
      .catch((error) => {
        throw error;
      });

    return products;
  });
