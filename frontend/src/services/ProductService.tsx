import PageRequest from "@/types/request/PageRequest";
import { ProductDetailResponse, ProductDiscountSummaryResponse, ProductSummaryResponse } from "@/types/response/ProductResponse";

export const getProductsByCategories = async (categoryIds?: number[], pageRequest?: PageRequest) : Promise<ProductSummaryResponse[]> => {
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
        const response = await fetch(`${process.env.BACKEND_URL}/product/getByCategories?` + new URLSearchParams(query), {
            method: "GET",
            cache: "force-cache",
            next: { revalidate: 3600, tags: ['product', 'get-product', 'get-product-by-categories'] }
        });

        const status = response.status;  
        const data = await response.json();

        if(status == 200) {   
            (data as ProductSummaryResponse[]).forEach(item => {
                item.images = item.images.toString().split(',')
            });
            return data;
        } else {
            console.log("Error DAta", data);
            throw new Error(data);
        }
    } catch (error) {
        console.log("Error", error);
        throw error;
    }
};

export const getProductsByRatingCount = async (pageRequest?: PageRequest) : Promise<ProductSummaryResponse[]> => {
    const query: any = {};
    if(pageRequest) {
        if(pageRequest.size) {
            query.size = pageRequest.size.toString();
        }
    
        if(pageRequest.page) {
            query.page = pageRequest.page.toString();
        }    
    }

    try {
        const response = await fetch(`${process.env.BACKEND_URL}/product/getByRatingCount?` + new URLSearchParams(query), {
            method: "GET",
            cache: "force-cache",
            next: { revalidate: 3600, tags: ['product', 'get-product', 'get-product-by-rating-count'] }
        });

        const status = response.status;  
        const data = await response.json();

        if(status == 200) {   
            (data as ProductSummaryResponse[]).forEach(item => {
                item.images = item.images.toString().split(',')
            });
            return data;
        } else {
            throw new Error(data);
        }
    } catch (error) {
        throw error;
    }
};

export const getProductsByRatingAverage = async (pageRequest?: PageRequest) : Promise<ProductSummaryResponse[]> => {
    const query: any = {};
    if(pageRequest) {
        if(pageRequest.size) {
            query.size = pageRequest.size.toString();
        }
    
        if(pageRequest.page) {
            query.page = pageRequest.page.toString();
        }    
    }

    try {
        const response = await fetch(`${process.env.BACKEND_URL}/product/getByRatingAvg?` + new URLSearchParams(query), {
            method: "GET",
            cache: "force-cache",
            next: { revalidate: 3600, tags: ['product', 'get-product', 'get-product-by-rating-avg'] }
        });

        const status = response.status;  
        const data = await response.json();

        if(status == 200) {   
            (data as ProductSummaryResponse[]).forEach(item => {
                item.images = item.images.toString().split(',')
            });
            return data;
        } else {
            throw new Error(data);
        }
    } catch (error) {
        throw error;
    }
};

export const getProductsByDiscount = async (pageRequest?: PageRequest) : Promise<ProductDiscountSummaryResponse[]> => {
    const query: any = {};
    if(pageRequest) {
        if(pageRequest.size) {
            query.size = pageRequest.size.toString();
        }
    
        if(pageRequest.page) {
            query.page = pageRequest.page.toString();
        }    
    }

    try {
        const response = await fetch(`${process.env.BACKEND_URL}/product/getByDiscount?` + new URLSearchParams(query), {
            method: "GET",
            cache: "force-cache",
            next: { revalidate: 3600, tags: ['product', 'get-product', 'get-product-by-discount'] }
        });

        const status = response.status;  
        const data = await response.json();

        if(status == 200) {   
            (data as ProductSummaryResponse[]).forEach(item => {
                item.images = item.images.toString().split(',')
            });
            return data;
        } else {
            throw new Error(data);
        }
    } catch (error) {
        throw error;
    }
};

export const getProductById = async (id: string) : Promise<ProductDetailResponse> => {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/product/${id}`, {
            method: "GET",
        });

        const status = response.status;  
        const data = await response.json();

        if(status == 200) {   
            data.images = data.images.split(',');
           return data;
        } else {
            throw new Error(data);
        }
    } catch (error) {
        throw error;
    }
};