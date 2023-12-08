import { saveReviewProduct } from "@/services/ReviewProductService";
import { ReviewProductRequest } from "@/types/request/ReviewProductRequest";
import {
  useCallback,
  useContext,
  useState
} from "react";
import { toast } from "react-toastify";
import {
  DetailProductContext,
  DetailProductContextType,
} from "../../../_provider/DetailProductProvider";
import "./index.scss";

export default function RatingForm(props: any) {
  const { setProduct, product } = useContext(
    DetailProductContext
  ) as DetailProductContextType;
  const [form, setForm] = useState<ReviewProductRequest>({
    star: 5,
    product_id: product.id,
    comment: "",
  });

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await saveReviewProduct(form)
        .then((response) => {
          setProduct({
            ...product,
            reviews: [...product.reviews, response]
          });
          toast.info("Review successfully!", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch((error: Error) => {
          toast.error(error.message, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    },
    [form]
  );

  return (
    <div className="rating-form">
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="stars">
          <input
            type="radio"
            onClick={(e) =>
              setForm({ ...form, star: parseInt(e.currentTarget.value) })
            }
            id="star1"
            name="rating"
            value="1"
          />
          <label htmlFor="star1"></label>
          <input
            type="radio"
            onClick={(e) =>
              setForm({ ...form, star: parseInt(e.currentTarget.value) })
            }
            id="star2"
            name="rating"
            value="2"
          />
          <label htmlFor="star2"></label>
          <input
            type="radio"
            onClick={(e) =>
              setForm({ ...form, star: parseInt(e.currentTarget.value) })
            }
            id="star3"
            name="rating"
            value="3"
          />
          <label htmlFor="star3"></label>
          <input
            type="radio"
            onClick={(e) =>
              setForm({ ...form, star: parseInt(e.currentTarget.value) })
            }
            id="star4"
            name="rating"
            value="4"
          />
          <label htmlFor="star4"></label>
          <input
            type="radio"
            onClick={(e) =>
              setForm({ ...form, star: parseInt(e.currentTarget.value) })
            }
            id="star5"
            name="rating"
            value="5"
          />
          <label htmlFor="star5"></label>
        </div>

        <textarea
          onChange={(e) => setForm({ ...form, comment: e.currentTarget.value })}
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
