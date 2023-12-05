import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import "./page.scss";
import Sidebar from "./_components/Sidebar";
import ProductDiscount from "./_components/ProductDiscount";
import ProductPannel from "./_components/ProductPannel";

export default function Product(props: any) {
  return (
    <>
      <Breadcrumb
        current="Product"
        previous={[
          {
            id: "0",
            content: "Home",
            url: "/home",
          },
        ]}
        title="Organi Product"
        background_image="/img/breadcrumb.jpg"
      />

      {/* Product Section Begin */}
      <section className="product spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-5">
              <Sidebar />
            </div>
            <div className="col-lg-9 col-md-7">
              <ProductDiscount />
              <ProductPannel />
            </div>
          </div>
        </div>
      </section>
      {/* Product Section End */}
    </>
  );
}
