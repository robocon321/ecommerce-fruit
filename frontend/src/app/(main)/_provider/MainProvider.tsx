"use client";

import Loading from "@/components/Loading/Loading";
import { loadUser } from "@/services/AuthService";
import { UserDetailResponse } from "@/types/response/UserResponse";
import { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export type MainContextType = {
  user: UserDetailResponse | undefined,
  isLoading: boolean
};

export const MainContext = createContext<MainContextType | null>(null);

const MainProvider = (props: any) => {
  const [user, setUser] = useState<UserDetailResponse>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = useCallback(async () => {
    await loadUser()
    .then(response => {
      setUser(response);
      setIsLoading(false);
    })
    .catch(error => {
      toast.error(error.message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsLoading(false);
    })
  }, []);

  const value = {
    user,
    isLoading
  };

  if(isLoading) {
    return <Loading />
  }

  return (
    <MainContext.Provider value={value}>{props.children}</MainContext.Provider>
  );
};

export default MainProvider;
