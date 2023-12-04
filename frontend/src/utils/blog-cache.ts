  import { getBlogsByCategories } from "@/services/BlogService";
import PageRequest from "@/types/request/PageRequest";
import { BlogSummaryResponse } from "@/types/response/BlogResponse";
import { cache } from "react";
  
  export const cacheBlogsByCategories = cache(
    async (categoryIds?: number[], pageRequest?: PageRequest) => {
      let blogs: BlogSummaryResponse[] = [];
      await getBlogsByCategories(categoryIds, pageRequest)
        .then((response) => {
          blogs = response;
        })
        .catch((error) => {
          throw error;
        });
  
      return blogs;
    }
  );