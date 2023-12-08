"use client";

import Loading from "@/components/Loading/Loading";
import { getProductById } from "@/services/ProductService";
import { ProductDetailResponse } from "@/types/response/ProductResponse";
import { notFound } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

export type DetailProductContextType = {
  product: ProductDetailResponse;
  setProduct: Dispatch<SetStateAction<ProductDetailResponse | undefined>>;
};

export const DetailProductContext =
  createContext<DetailProductContextType | null>(null);

const DetailProductProvider = (props: any) => {
  const [product, setProduct] = useState<ProductDetailResponse>();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = useCallback(async () => {
    try {
      const loadProduct = await getProductById(props.id);
      setProduct(loadProduct);
    } catch (error) {
      notFound();
    }
  }, []);

  if (product == undefined || setProduct == undefined) {
    return <Loading />;
  } else {
    const value = {
      product,
      setProduct
    };

    return (
      <DetailProductContext.Provider value={value}>
        {props.children}
      </DetailProductContext.Provider>
    );
  }
};

export default DetailProductProvider;
