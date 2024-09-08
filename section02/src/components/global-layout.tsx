import Link from "next/link";
import React, { ReactNode } from "react";
import style from "./global-layout.module.css";

const GlobalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <Link href={"/"}>📚 Onebite-Books</Link>
      </header>
      <main className={style.main}>{children}</main>
      <footer className={style.footer}>제작 @김경우</footer>
    </div>
  );
};

export default GlobalLayout;
