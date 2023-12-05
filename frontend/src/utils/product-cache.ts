import {
  getProductsByCategories,
  getProductsByDiscount,
  getProductsByRatingAverage,
  getProductsByRatingCount,
} from "@/services/ProductService";
import PageRequest from "@/types/request/PageRequest";
import { ProductDiscountSummaryResponse, ProductSummaryResponse } from "@/types/response/ProductResponse";
import { cache } from "react";

export const cacheProductsByCategories = cache(
  async (categoryIds?: number[], pageRequest?: PageRequest) => {
    let products: ProductSummaryResponse[] = [];
    await getProductsByCategories(categoryIds, pageRequest)
      .then((response) => {
        products = response;
      })
      .catch((error) => {
        throw error;
      });

    return products;
  }
);

export const cacheProductsByRatingCount = cache(
  async (pageRequest?: PageRequest) => {
    let products: ProductSummaryResponse[] = [];
    await getProductsByRatingCount(pageRequest)
      .then((response) => {
        products = response;
      })
      .catch((error) => {
        throw error;
      });

    return products;
  }
);

export const cacheProductsByRatingAverage = cache(
  async (pageRequest?: PageRequest) => {
    let products: ProductSummaryResponse[] = [];
    await getProductsByRatingAverage(pageRequest)
      .then((response) => {
        products = response;
      })
      .catch((error) => {
        throw error;
      });

    return products;
  }
);

export const cacheProductsByDiscount = cache(
  async (pageRequest?: PageRequest) => {
    let products: ProductDiscountSummaryResponse[] = [];
    await getProductsByDiscount(pageRequest)
      .then((response) => {
        products = response;
      })
      .catch((error) => {
        throw error;
      });

    return products;
  }
);

