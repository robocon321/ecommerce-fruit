import Filter from "./Filter";
import Pagination from "./Pagination";
import ProductList from "./ProductList";

export default function ProductPannel(props: any) {
  return (
    <>
      <Filter />
      <ProductList />
      <Pagination />
    </>
  );
}
