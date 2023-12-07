import { ReviewProductResponse } from "@/types/response/ReviewProductResponse";
import "./index.scss";
import RatingLine from "./RatingLine";

type RatingListPropsType = {
  reviews: ReviewProductResponse[];
};

export default function RatingList(props: RatingListPropsType) {
  const { reviews } = props;
  console.log(reviews);
  return (
    <div className="user-ratings">
      {reviews.map((item) => (
        <RatingLine key={item.id} {...item} />
      ))}
    </div>
  );
}
