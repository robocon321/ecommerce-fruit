import CategoryResponse from "./CategoryResponse";

export type ProductResponse = {
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
    user_id: number,
    categories: CategoryResponse[]
}

export type ProductSummaryResponse = {
    id: number,
    name: string,
    real_price: number,
    sale_price: number,
    images: string[],
}

export type ProductDiscountSummaryResponse = {
    id: number,
    name: string,
    real_price: number,
    sale_price: number,
    discount: number,
    images: string[],
}