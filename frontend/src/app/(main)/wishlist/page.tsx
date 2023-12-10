"use client";

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import "./page.scss";
import WishlistTable from "./_component/WishlistTable";

export default function Wishlist(props: any) {
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
        current="Shopping Wishlist"
        title="Shopping Wishlist"
      />
      <section className="shoping-cart spad">
        <div className="container">
          <WishlistTable />
        </div>
      </section>
    </>
  );
}
