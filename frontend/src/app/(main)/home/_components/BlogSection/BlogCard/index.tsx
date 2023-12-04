import { BlogSummaryResponse } from "@/types/response/BlogResponse";
import moment from "moment";

export default function BlogCard(props: BlogSummaryResponse) {
    return (
    <div className="blog__item">
      <div className="blog__item__pic">
        <img src={props.image} alt="" />
      </div>
      <div className="blog__item__text">
        <ul>
          <li>
            <i className="fa fa-calendar-o"></i> {moment(props.updatedAt).format('MMM DD YYYY')}
          </li>
          <li>
            <i className="fa fa-comment-o"></i> {props.review_count}
          </li>
        </ul>
        <h5>
          <a href="#">{props.name}</a>
        </h5>
        <p>
          {props.short_description}
        </p>
      </div>
    </div>
  );
}
