import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import "@/static/css/bootstrap.min.css";
import "@/static/css/font-awesome.min.css";
import "@/static/css/elegant-icons.css";
import "@/static/css/nice-select.css";
import "@/static/css/slicknav.min.css";
import "@/static/css/style.css";
import "swiper/css";
import "swiper/css/pagination";
import Footer from "./_components/Footer/Footer";
import Header from "./_components/Header/Header";
import Hero from "./_components/Hero/Hero";
import HumbergerMenu from "./_components/HumbergerMenu/HumbergerMenu";
import { getCategories } from "@/services/CategoryService";
import CategoryResponse from "@/types/response/CategoryResponse";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let categories: CategoryResponse[] = [];
  await getCategories()
    .then((response) => {
      categories = response;
    })
    .catch((error) => {
      throw error;
    });

  return (
    <>
      <HumbergerMenu />
      <Header />
      <Hero categories={categories} />
      {children}
      <Footer />
    </>
  );
}
