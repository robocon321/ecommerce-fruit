import { ReviewProductResponse } from "@/types/response/ReviewProductResponse";
import moment from "moment";

export default function RatingLine(props: ReviewProductResponse) {
  return (
    <div className="user-rating">
      <div className="username">{props.user.username}</div>
      <div className="createdAt">
        Created at: {moment(props.updatedAt).format("MMM DD YYYY")}
      </div>
      <div className="stars">
        {Array.from({ length: props.star }).map((item, index) => (
          <span className="star active">★</span>
        ))}
        {Array.from({ length: 5 - props.star }).map((item, index) => (
          <span className="star">★</span>
        ))}
      </div>
      <div className="content">{props.comment}</div>
    </div>
  );
}
