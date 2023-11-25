"use client";

import React, { createContext, useState } from "react";
import { RegisterContextType, RegisterState, StatusState } from "../_type/RegisterType";
import { register } from "@/services/AuthService";

export const RegisterContext = createContext<RegisterContextType | null>(null);

const defaultStatus = {
    isLoading: false,
    message: '',
    error: ''
}

const defaultRegisterRequest: RegisterState = {
    username: '',
    password: '',
    re_password: ''
}

const RegisterProvider = (props: any) => {
    const [status, setStatus] = useState<StatusState>(defaultStatus);
    const [registerRequest, setRegisterRequest] = useState<RegisterState>(defaultRegisterRequest);

    const onSubmit = async () => {
        if(validate()) {
            setStatus({
                ...status,
                isLoading: true
            });
            await register({username: registerRequest.username, password: registerRequest.password})
            .then(data => {
                localStorage.setItem("token", data.token);
                setStatus({
                    isLoading: false,
                    message: 'Successfully',
                    error: ''
                });
                window.location.href = "/login";
            })
            .catch(error => {
                setStatus({
                    isLoading: false,
                    message: '',
                    error: error.message
                });
            });    
        }
    }

    const validate = (): boolean => {
        let error = "";
        if(registerRequest.username == '') {
            error += "Username not blank.";
        }
        if(registerRequest.password == '') {
            error += "Password not blank.";
        }
        if(registerRequest.re_password == '') {
            error += "Re-password not blank.";
        }
        if(registerRequest.password != registerRequest.re_password) {
            error += "Password not match with re-password";
        }
        if(error == "") {
            return true;
        } else {
            setStatus({
                ...status,
                error
            });
            return false;
        }
    }

    const value = {
        status,
        setStatus,
        registerRequest,
        setRegisterRequest,
        onSubmit
    }

    return (
        <RegisterContext.Provider value={value}>{props.children}</RegisterContext.Provider>
    )
}

export default RegisterProvider;