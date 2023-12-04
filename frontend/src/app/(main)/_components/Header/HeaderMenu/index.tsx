"use client"

import { useParams, usePathname } from "next/navigation";

export default function HeaderMenu(props: any) {
  const pathname = usePathname();

  return (
    <nav className="header__menu">
      <ul>
        <li className={pathname.includes("/home") ? "active" : ""}>
          <a href="/home">Home</a>
        </li>
        <li className={pathname.includes("/product") ? "active" : ""}>
          <a href="/product">Shop</a>
        </li>
        <li className={pathname.includes("/blog") ? "active" : ""}>
          <a href="/blog">Blog</a>
        </li>
        <li className={pathname.includes("/contact") ? "active" : ""}>
          <a href="/contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
}
