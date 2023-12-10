import { ReadonlyURLSearchParams } from "next/navigation";

export function getQueryProduct(searchParams: ReadonlyURLSearchParams): any {
    const query: any = {};

    const search = searchParams.get("search");
    const range_price = searchParams.get("range_price");
    const page = searchParams.get("page");
    const size = searchParams.get("size");
    const categoryIds = searchParams.get("categoryIds");
    const sortBy = searchParams.get("sortBy");
    const sortType = searchParams.get("sortType");

    if(search) {
        query.search = search;
    }

    if(range_price) {
        query.range_price = range_price;
    }

    if(page) {
        query.page = page;
    }

    if(size) {
        query.size = size;
    }

    if(categoryIds) {
        query.categoryIds = categoryIds;
    }

    if(sortBy) {
        query.sortBy = sortBy
    }

    if(sortType) {
        query.sortType = sortType;
    }

    return query;
}