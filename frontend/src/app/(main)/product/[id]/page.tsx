"use client";

import { getProductById } from "@/services/ProductService";
import { ProductDetailResponse } from "@/types/response/ProductResponse";
import { notFound } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import "./page.scss";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import ProductRelated from "./_components/ProductRelated";
import ProductDetailInfo from "./_components/ProductDetailInfo";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<ProductDetailResponse>();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = useCallback(async () => {
    try {
      const loadProduct = await getProductById(params.id);
      setProduct(loadProduct);
    } catch (error) {
      notFound();
    }    
  }, []);


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
