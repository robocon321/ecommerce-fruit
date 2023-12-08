import "@/app/globals.css";
import "@/static/css/bootstrap.min.css";
import "@/static/css/elegant-icons.css";
import "@/static/css/font-awesome.min.css";
import "@/static/css/nice-select.css";
import "@/static/css/slicknav.min.css";
import "@/static/css/style.css";
import { cacheCategories } from "@/utils/category-cache";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { use } from "react";
import "swiper/css";
import "swiper/css/pagination";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import HumbergerMenu from "./_components/HumbergerMenu";
import MainProvider from "./_provider/MainProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = use(cacheCategories());

  return (
    <MainProvider>
      <HumbergerMenu />
      <Header />
      <Hero categories={categories} />
      {children}
      <Footer />
    </MainProvider>
  );
}
