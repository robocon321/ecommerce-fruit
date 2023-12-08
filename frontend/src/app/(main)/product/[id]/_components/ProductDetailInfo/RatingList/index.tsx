import { useContext } from "react";
import { DetailProductContext, DetailProductContextType } from "../../../_provider/DetailProductProvider";
import RatingLine from "./RatingLine";
import "./index.scss";

export default function RatingList(props: any) {
  const { product: { reviews } } = useContext(DetailProductContext) as DetailProductContextType;
  return (
    <div className="user-ratings">
      {reviews.map((item) => (
        <RatingLine key={item.id} {...item} />
      ))}
    </div>
  );
}
