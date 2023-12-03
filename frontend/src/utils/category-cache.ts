import { getCategories } from "@/services/CategoryService";
import CategoryResponse from "@/types/response/CategoryResponse";
import { cache } from "react";

export const cacheCategories = cache(async () => {
  let categories: CategoryResponse[] = [];
  await getCategories()
    .then((response) => {
      categories = response;
    })
    .catch((error) => {
      throw error;
    });

  return categories;
});
