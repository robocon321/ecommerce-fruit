import PageRequest from "@/types/request/PageRequest";
import { BlogSummaryResponse } from "@/types/response/BlogResponse";

export const getBlogsByCategories = async (categoryIds?: number[], pageRequest?: PageRequest) : Promise<BlogSummaryResponse[]> => {
    const query: any = {};
    if(categoryIds) {
        query.categories = categoryIds.join(',');
    }

    if(pageRequest) {
        if(pageRequest.sortBy) {
            query.sortBy = pageRequest.sortBy.join(',');        
        }
    
        if(pageRequest.sortType) {
            query.sortType = pageRequest.sortType.join(',');        
        }
    
        if(pageRequest.size) {
            query.size = pageRequest.size.toString();
        }
    
        if(pageRequest.page) {
            query.page = pageRequest.page.toString();
        }    
    }

    try {
        const response = await fetch(`${process.env.BACKEND_URL}/blog/getByCategories?` + new URLSearchParams(query), {
            method: "GET",
            cache: "force-cache",
            next: { revalidate: 3600, tags: ['blog', 'get-blog', 'get-blog-by-categories'] }
        });

        const status = response.status;  
        const data = await response.json();

        if(status == 200) {   
            return data;
        } else {
            throw new Error(data);
        }
    } catch (error) {
        throw error;
    }
};
