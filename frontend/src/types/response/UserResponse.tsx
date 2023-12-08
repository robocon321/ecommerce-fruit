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
    }
}