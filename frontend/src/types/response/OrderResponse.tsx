export type OrderResponse = {
    id: number,
    user_id: number,
    status: string,
    updatedAt: Date,
    createdAt: Date
}

export type OrderDetailResponse = {
    id: number,
    product_id: number,
    quantity: number,
    price: number,
    order_id: number,
    updatedAt: Date,
    createdAt: Date
}

export type CreateOrderResponse = {
    order: OrderResponse,
    order_details: OrderDetailResponse
}