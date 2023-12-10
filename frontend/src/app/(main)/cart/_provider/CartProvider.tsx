"use client";

import Loading from "@/components/Loading/Loading";
import { CartProductResponse } from "@/types/response/CartResponse";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { MainContext, MainContextType } from "../../_provider/MainProvider";

export type CartContextType = {
  carts: CartProductResponse[];
  setCarts: Dispatch<SetStateAction<CartProductResponse[] | undefined>>,
  isLoading: boolean,
  setIsLoading: Dispatch<SetStateAction<boolean>>
};

export const CartContext = createContext<CartContextType | null>(null);

const CartProvider = (props: any) => {
  const [carts, setCarts] = useState<CartProductResponse[]>();
  const { user } = useContext(MainContext) as MainContextType;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(user) {
      setCarts(user.products_cart);
    }
  }, [user]);

  if (carts != undefined && setCarts != undefined && !isLoading) {
    const value = {
      carts,
      setCarts,
      isLoading,
      setIsLoading
    };

    return (
      <CartContext.Provider value={value}>
        {props.children}
      </CartContext.Provider>
    );
  } else {
    return <Loading />;
  }
};

export default CartProvider;
