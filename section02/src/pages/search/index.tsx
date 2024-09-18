import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import SearchableLayout from "@/components/searchable-layout";
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
} from "next";
import fetchBooks from "@/lib/fetch-books";
import { BookData } from "@/types";

// getServerSideProps에서 검색 결과를 백엔드 서버로부터 불러와서 컴포넌트에게 전달해주어야함.
// 그러면 쿼리 스트링으로 전달된 값을 getServerSideProps에서 읽어와야함
// 이때는 context라는 매개변수 이용.
// 타입은 GetServerSidePropsContext.
// 이 context 매개변수에는 브라우저로 부터 받은 요청에 대한 모든 정보가 담겨있음
// 콘솔로그로 확인해보면 맨 밑쪽에 query가 담겨있음

// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   // getStaticProps 함수에게 전달되는 context 라는 매개변수에는 query가 없음
//   // 빌드 타임에 query string을 알 수 있을까?
//   // 없지. 사용자의 입력이나, 리스트의 정렬기준이 전달되는 공간이라 빌드 타임에 알 수가 없어
//   const q = context.query.q as string;
//   // 다른 방법이 없나?? => 없다.
//   // 굳이~~ 하려면 클라이언트 측에서 수행해야함.
//   // 리액트때 했었던 그 방식 그대로 데이터 패칭
//   const books = await fetchBooks(q);
//   return { props: { books } };
// };

// search
const Page = () => {
  const [books, setBooks] = useState<BookData[]>([]);
  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
};

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};

export default Page;
