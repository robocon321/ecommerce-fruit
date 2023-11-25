"use client";

import React, { createContext, useState } from "react";
import { LoginContextType, LoginState, StatusState } from "../_type/LoginType";
import { login } from "@/services/AuthService";
import { redirect, useRouter } from "next/navigation";

export const LoginContext = createContext<LoginContextType | null>(null);

const defaultStatus = {
    isLoading: false,
    message: '',
    error: ''
}

const defaultLoginRequest: LoginState = {
    username: '',
    password: ''
}

const LoginProvider = (props: any) => {
    const router = useRouter();
    const [status, setStatus] = useState<StatusState>(defaultStatus);
    const [loginRequest, setLoginRequest] = useState<LoginState>(defaultLoginRequest);

    const onSubmit = async () => {
        setStatus({
            ...status,
            isLoading: true
        });
        await login(loginRequest)
        .then(data => {
            localStorage.setItem("token", data.token);
            setStatus({
                isLoading: false,
                message: 'Successfully',
                error: ''
            });
            window.location.href = "/home";
        })
        .catch(error => {
            setStatus({
                isLoading: false,
                message: '',
                error: error.message
            })
        });
    }

    const value = {
        status,
        setStatus,
        loginRequest,
        setLoginRequest,
        onSubmit
    }

    return (
        <LoginContext.Provider value={value}>{props.children}</LoginContext.Provider>
    )
}

export default LoginProvider;