import { UserResponse } from "./UserResponse"

export type ReviewProductResponse = {
    id: number,
    comment: string,
    star: number,
    createdAt: Date,
    updatedAt: Date,
    user: UserResponse
}