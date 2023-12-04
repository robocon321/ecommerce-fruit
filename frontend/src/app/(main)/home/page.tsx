import "./page.scss";
import { use } from "react";
import CategorySwiper from "./_components/CategorySwiperSection";
import { cacheCategories } from "@/utils/category-cache";
import FeatureProduct from "./_components/FeatureProductSection";
import { cacheProductsByCategories } from "@/utils/product-cache";
import Banner from "./_components/BannerSection";
import TopProduct from "./_components/TopProductSection";
import BlogSection from "./_components/BlogSection";

export default function Home(props: any) {
  const categories = use(cacheCategories());
  const outstandingProducts = use(cacheProductsByCategories([], { size: 12 }));
  const orangesProducts = use(cacheProductsByCategories([1, 2], { size: 12 }));
  const freshProducts = use(cacheProductsByCategories([3, 4], { size: 12 }));
  const vegetableProducts = use(cacheProductsByCategories([5, 6], { size: 12 }));
  const fastfoodProducts = use(cacheProductsByCategories([7, 8], { size: 12 }));

  return (
    <>
      <CategorySwiper categories={categories} />
      <FeatureProduct
        outstandingProducts={outstandingProducts}
        orangesProducts={orangesProducts}
        freshProducts={freshProducts}
        vegetableProducts={vegetableProducts}
        fastfoodProducts={fastfoodProducts}
      />
      <Banner />
      <TopProduct />
      <BlogSection />
    </>
  );
}
