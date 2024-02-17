import CategoryResponse from "./CategoryResponse";
import { ReviewProductResponse } from "./ReviewProductResponse";
import { UserResponse } from "./UserResponse";
export type ProductSummaryResponse = {
    id: number,
    name: string,
    real_price: number,
    sale_price: number,
    stock:  number,
    images: string[],
}

export type ProductDiscountSummaryResponse = {
    id: number,
    name: string,
    real_price: number,
    sale_price: number,
    stock:  number,
    discount: number,
    images: string[],
}

export type ProductDetailResponse = {
    id: number,
    name: string,
    short_description: string,
    long_description: string,
    real_price: number,
    sale_price: number,
    stock:  number,
    weight: number,
    images: string[],
    createAt: Date,
    updateAt: Date,
    user: UserResponse,
    reviews: ReviewProductResponse[],
    categories: CategoryResponse[]

}

export type ProductPageResponse = {
    itemCount: number,
    products: ProductSummaryResponse[],
    pageCount: number
}