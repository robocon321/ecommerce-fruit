"use client";
import { cacheCategories } from "@/utils/category-cache";
import { use } from "react";
import { useSearchParams } from 'next/navigation';
import { getQueryProduct } from "@/utils/query-path";
import Link from "next/link";

export default function Department(props: any) {
  const categories = use(cacheCategories());
  const searchParams = useSearchParams();
  const query = getQueryProduct(searchParams);
  
  return (
    <div className="sidebar__item">
      <h4>Department</h4>
      <ul>
        {categories.map((item) => (
          <li>
            <Link href={`/product?${new URLSearchParams({...query, categoryIds: [item.id]})}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
