import React from "react";
import style from "./[id].module.css";
import fetchBooks from "@/lib/fetch-books";
import {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import fetchOneBook from "@/lib/fetch-one-book";

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: false,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));

  return { props: { book } };
};

const Book = ({ book }: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!book) return "문제가 발생했습니다. 다시 시도하세요.";

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;
  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url(${coverImgUrl})` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
};

export default Book;
