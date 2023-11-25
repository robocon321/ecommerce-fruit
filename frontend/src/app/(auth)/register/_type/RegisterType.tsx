import { Dispatch, SetStateAction } from "react"

export type RegisterContextType = {
    status: StatusState,
    setStatus: Dispatch<SetStateAction<StatusState>>,
    registerRequest: RegisterState,
    setRegisterRequest: Dispatch<SetStateAction<RegisterState>>,
    onSubmit: () => void,
}

export type StatusState = {
    isLoading: boolean,
    message: string,
    error: string
}

export type RegisterState = {
    username: string,
    password: string,
    re_password: string
}