import Color from "./Color"
import Department from "./Department"
import LatestProduct from "./LatestProduct";
import Price from "./Price"
import Size from "./Size"

export default function Sidebar(props: any) {
  return (
    <div className="sidebar">
      <Department />
      <Price />
      <Color />
      <Size />
      <LatestProduct />
    </div>
  );
}
