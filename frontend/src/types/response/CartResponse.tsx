export type CartResponse = {
    id: number,
    user_id: number,
    product_id: number,
    quantity: number,
    createdAt: Date,
    updatedAt: Date
}

export type CartSummaryResponse = {
    id: number,
    quantity: number,
    createdAt: Date,
    updatedAt: Date
}