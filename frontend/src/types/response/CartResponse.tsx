export type CartResponse = {
    id: number,
    user_id: number,
    product_id: number,
    quantity: number,
    createdAt: Date,
    updatedAt: Date
}

export type CartInfoResponse = {
    id: number,
    quantity: number,
    createdAt: Date,
    updatedAt: Date
}

export type CartProductResponse = {
    id: number,
    name: string,
    real_price: number,
    sale_price: number,
    images: string[],
    stock:  number,
    cart_info: CartInfoResponse
}