import { CartSummaryResponse } from "./CartResponse"
import { ProductSummaryResponse } from "./ProductResponse"

export type UserResponse = {
    id: number,
    username: string
}

export type UserDetailResponse = {
    id: number,
    username: string,
    roles: {
        id: number,
        role_name: string
    },
    products_wishlist: ProductSummaryResponse[],
    products_cart: {
        id: number,
        name: string,
        real_price: number,
        sale_price: number,
        images: string[],
        cart_info: CartSummaryResponse
    }[]
}