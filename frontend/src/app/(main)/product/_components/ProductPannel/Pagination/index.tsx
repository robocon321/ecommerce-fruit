import { getQueryProduct } from "@/utils/query-path";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

type PaginationPropsType = {
  pageCount: number;
};

export default function Pagination(props: PaginationPropsType) {
  const { pageCount } = props;
  const searchParams = useSearchParams();
  const currentPage = useMemo(() => {
    const result = parseInt(searchParams.get("page") || "0");
    return result <= 1 ? 1 : result >= pageCount ? pageCount : result;
  }, [searchParams, pageCount]);

  if (pageCount <= 2) {
    return (
      <div className="product__pagination">
        {Array(pageCount)
          .fill(0)
          .map((item, index) => (
            <Link
              href={
                "/product?" +
                new URLSearchParams({
                  ...getQueryProduct(searchParams),
                  page: index + 1,
                })
              }
            >
              {index + 1}
            </Link>
          ))}
      </div>
    );
  }

  return (
    <div className="product__pagination">
      <Link
        href={
          "/product?" +
          new URLSearchParams({
            ...getQueryProduct(searchParams),
            page: currentPage == 1 ? currentPage : currentPage - 1,
          })
        }
      >
        {currentPage == 1 ? currentPage : currentPage - 1}
      </Link>
      <Link
        href={
          "/product?" +
          new URLSearchParams({
            ...getQueryProduct(searchParams),
            page: currentPage == 1 ? currentPage + 1 : currentPage,
          })
        }
      >
        {currentPage == 1 ? currentPage + 1 : currentPage}
      </Link>
      <Link
        href={
          "/product?" +
          new URLSearchParams({
            ...getQueryProduct(searchParams),
            page: currentPage == 1 ? currentPage + 2 : currentPage + 1,
          })
        }
      >
        {currentPage == 1 ? currentPage + 2 : currentPage + 1}
      </Link>
    </div>
  );
}
