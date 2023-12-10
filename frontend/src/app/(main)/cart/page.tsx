"use client";

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import "./page.scss";
import CartTable from "./_component/CartTable";
import CartControl from "./_component/CartControl";

export default function Cart(props: any) {
  return (
    <>
      <Breadcrumb
        background_image="img/breadcrumb.jpg"
        previous={[
          {
            id: "0",
            content: "Home",
            url: "/home",
          },
        ]}
        current="Shopping Cart"
        title="Shopping Cart"
      />
      <section className="shoping-cart spad">
        <div className="container">
          <CartTable />
          <CartControl />
        </div>
      </section>
    </>
  );
}
