import { getQueryProduct } from "@/utils/query-path";
import { useRouter, useSearchParams } from "next/navigation";

type FilterPropsType = {
  itemCount: number
}

export default function Filter(props: FilterPropsType) {
  const { itemCount } = props;
  const searchParams = useSearchParams();
  const router = useRouter();

  const onSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(e.currentTarget.value);
  };

  return (
    <div className="filter__item">
      <div className="row">
        <div className="col-lg-4 col-md-5">
          <div className="filter__sort">
            <span>Sort By</span>
            <select onChange={onSort}>
              <option
                value={
                  "/product?" +
                  new URLSearchParams({
                    ...getQueryProduct(searchParams),
                    sortBy: ["sale_price"],
                    sortType: ["DESC"],
                  })
                }
              >
                Highest price
              </option>
              <option
                value={
                  "/product?" +
                  new URLSearchParams({
                    ...getQueryProduct(searchParams),
                    sortBy: ["sale_price"],
                    sortType: ["ASC"],
                  })
                }
              >
                Lowest price
              </option>
              <option
                value={
                  "/product?" +
                  new URLSearchParams({
                    ...getQueryProduct(searchParams),
                    sortBy: ["createdAt"],
                    sortType: ["DESC"],
                  })
                }
              >
                Latest
              </option>
              <option
                value={
                  "/product?" +
                  new URLSearchParams({
                    ...getQueryProduct(searchParams),
                    sortBy: ["createdAt"],
                    sortType: ["ASC"],
                  })
                }
              >
                Newest
              </option>
            </select>
          </div>
        </div>
        <div className="col-lg-4 col-md-4">
          <div className="filter__found">
            <h6>
              <span>{itemCount}</span> Products found
            </h6>
          </div>
        </div>
        <div className="col-lg-4 col-md-3">
          <div className="filter__option">
            <span className="icon_grid-2x2"></span>
            <span className="icon_ul"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
