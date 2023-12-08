"use client";

import { getProductById } from "@/services/ProductService";
import { ProductDetailResponse } from "@/types/response/ProductResponse";
import { notFound } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import "./page.scss";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import ProductRelated from "./_components/ProductRelated";
import ProductDetailInfo from "./_components/ProductDetailInfo";
import { DetailProductContext, DetailProductContextType } from "./_provider/DetailProductProvider";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const { product } = useContext(DetailProductContext) as DetailProductContextType;

  return (
    <>
      <Breadcrumb
        background_image="/img/breadcrumb.jpg" 
        current={product ? product.name : ""} 
        previous={[
          {
            id: '0',
            content: 'Shop',
            url: '/shop'
          }
        ]} 
        title={product ? product.name : ""}      
       />
      {product && <ProductDetailInfo product={product} />}
      {product && <ProductRelated categories={product.categories} />}
    </>
  );
}
