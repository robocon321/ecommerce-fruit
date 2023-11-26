import CategoryResponse from "@/types/response/CategoryResponse"
import { Dispatch, SetStateAction } from "react"

export type MainContextType = {
    status: StatusState,
    setStatus: Dispatch<SetStateAction<StatusState>>,
    categories: CategoryResponse[]
}

export type StatusState = {
    isLoading: boolean,
    message: string,
    error: string
}
