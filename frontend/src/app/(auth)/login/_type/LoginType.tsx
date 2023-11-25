import { Dispatch, SetStateAction } from "react"

export type LoginContextType = {
    status: StatusState,
    setStatus: Dispatch<SetStateAction<StatusState>>,
    loginRequest: LoginState,
    setLoginRequest: Dispatch<SetStateAction<LoginState>>,
    onSubmit: () => void,
}

export type StatusState = {
    isLoading: boolean,
    message: string,
    error: string
}

export type LoginState = {
    username: string,
    password: string
}