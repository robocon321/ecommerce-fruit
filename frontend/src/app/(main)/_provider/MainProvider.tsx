"use client";

import React, { createContext, useEffect, useState } from "react";
import { MainContextType, StatusState } from "../_type/MainType";
import CategoryResponse from "@/types/response/CategoryResponse";
import { getCategories } from "@/services/CategoryService";

export const MainContext = createContext<MainContextType | null>(null);

const defaultStatus = {
  isLoading: false,
  message: "",
  error: "",
};

const MainProvider = (props: any) => {
  const [status, setStatus] = useState<StatusState>(defaultStatus);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);

  useEffect(() => {
    setStatus({
      ...status,
      isLoading: true,
    });
    getCategories()
      .then((response) => {
        setStatus({
            isLoading: false,
            message: 'Successfully',
            error: ''
        });
        setCategories(response);
      })
      .catch((error) => {
        setStatus({
            isLoading: false,
            message: '',
            error: error.message
          });
        });
  }, []);

  const value = {
    status,
    setStatus,
    categories,
  };

  return (
    <MainContext.Provider value={value}>{props.children}</MainContext.Provider>
  );
};

export default MainProvider;
