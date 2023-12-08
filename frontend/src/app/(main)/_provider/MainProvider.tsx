"use client";

import Loading from "@/components/Loading/Loading";
import { loadUser } from "@/services/AuthService";
import { UserDetailResponse } from "@/types/response/UserResponse";
import { Dispatch, SetStateAction, createContext, useCallback, useEffect, useState } from "react";

export type MainContextType = {
  user: UserDetailResponse | undefined,
  isLoading: boolean,
  setUser: Dispatch<SetStateAction<UserDetailResponse | undefined>>
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
      .then((response) => {
        setUser(response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const value = {
    user,
    isLoading,
    setUser
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <MainContext.Provider value={value}>{props.children}</MainContext.Provider>
  );
};

export default MainProvider;
