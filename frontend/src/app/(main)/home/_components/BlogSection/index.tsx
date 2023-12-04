import { cacheBlogsByCategories } from "@/utils/blog-cache";
import { use } from "react";
import BlogCard from "./BlogCard";

export default function BlogSection(props: any) {
  const lastestBlogs = use(
    cacheBlogsByCategories([], {
      size: 3,
      sortBy: ["updatedAt"],
      sortType: ["DESC"],
    })
  );

  return (
    <section className="from-blog spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title from-blog__title">
              <h2>From The Blog</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {lastestBlogs.map((item) => (
            <div key={item.id} className="col-lg-4 col-md-4 col-sm-6">
              <BlogCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
