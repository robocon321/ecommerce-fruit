"use client";

import { ProductSummaryResponse } from "@/types/response/ProductResponse";
import { useState } from "react";
import ProductCard from "./ProductCard";

type FeatureProductPropsType = {
  outstandingProducts: ProductSummaryResponse[];
  orangesProducts: ProductSummaryResponse[];
  freshProducts: ProductSummaryResponse[];
  vegetableProducts: ProductSummaryResponse[];
  fastfoodProducts: ProductSummaryResponse[];
};

export default function FeatureProduct(props: FeatureProductPropsType) {
  const {
    outstandingProducts,
    orangesProducts,
    freshProducts,
    vegetableProducts,
    fastfoodProducts,
  } = props;
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <section className="featured spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h2>Featured Product</h2>
            </div>
            <div className="featured__controls">
              <ul>
                <li
                  onClick={() => setTabIndex(0)}
                  className={tabIndex == 0 ? "active" : ""}
                  data-filter="*"
                >
                  All
                </li>
                <li
                  onClick={() => setTabIndex(1)}
                  className={tabIndex == 1 ? "active" : ""}
                  data-filter=".oranges"
                >
                  Oranges
                </li>
                <li
                  onClick={() => setTabIndex(2)}
                  className={tabIndex == 2 ? "active" : ""}
                  data-filter=".fresh-meat"
                >
                  Fresh Meat
                </li>
                <li
                  onClick={() => setTabIndex(3)}
                  className={tabIndex == 3 ? "active" : ""}
                  data-filter=".vegetables"
                >
                  Vegetables
                </li>
                <li
                  onClick={() => setTabIndex(4)}
                  className={tabIndex == 4 ? "active" : ""}
                  data-filter=".fastfood"
                >
                  Fastfood
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row featured__filter">
          {tabIndex == 0
            ? outstandingProducts.map((item) => (
                <div
                  key={item.id}
                  className="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat"
                >
                  <ProductCard {...item} />
                </div>
              ))
            : tabIndex == 1
            ? orangesProducts.map((item) => (
                <div
                  key={item.id}
                  className="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat"
                >
                  <ProductCard {...item} />
                </div>
              ))
            : tabIndex == 2
            ? freshProducts.map((item) => (
                <div
                  key={item.id}
                  className="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat"
                >
                  <ProductCard {...item} />
                </div>
              ))
            : tabIndex == 3
            ? vegetableProducts.map((item) => (
                <div
                  key={item.id}
                  className="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat"
                >
                  <ProductCard {...item} />
                </div>
              ))
            : fastfoodProducts.map((item) => (
                <div
                  key={item.id}
                  className="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat"
                >
                  <ProductCard {...item} />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
