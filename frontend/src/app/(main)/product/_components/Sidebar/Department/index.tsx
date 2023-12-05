import { cacheCategories } from "@/utils/category-cache";
import { use } from "react";

export default function Department(props: any) {
  const categories = use(cacheCategories());

  return (
    <div className="sidebar__item">
      <h4>Department</h4>
      <ul>
        {categories.map((item) => (
          <li>
            <a href="#">{item.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
