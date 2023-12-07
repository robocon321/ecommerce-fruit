import "./index.scss";

export default function RatingForm(props: any) {
  return (
    <div className="rating-form">
      <form>
        <div className="stars">
          <input type="radio" id="star1" name="rating" value="1" />
          <label htmlFor="star1"></label>
          <input type="radio" id="star2" name="rating" value="2" />
          <label htmlFor="star2"></label>
          <input type="radio" id="star3" name="rating" value="3" />
          <label htmlFor="star3"></label>
          <input type="radio" id="star4" name="rating" value="4" />
          <label htmlFor="star4"></label>
          <input type="radio" id="star5" name="rating" value="5" />
          <label htmlFor="star5"></label>
        </div>

        <textarea
          className="content-input"
          placeholder="Enter your review here"
        ></textarea>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}
