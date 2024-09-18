````javascript
// Home 노팅
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode, useEffect } from "react";
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { InferGetServerSidePropsType } from "next";

export const getServerSideProps = () => {
  // 이 함수는 서버측에서 실행이 되는 함수임. 따라서 아무리 콘솔로그를 찍어봐도 아무것도 안나올거임.
  // 우리가 보고있는 화면은 브라우저이기 때문에.
  // 그래서 브라우저 화면에서만 접근할 수 있는 window.location 이런걸 작성하면 에러가 발생할거임.
  // window는 브라우저를 의미하니까

  // 컴포넌트보다 먼저 실행됨, 컴포넌트에 필요한 데이터 불러오는 함수.
  // 함수명은 Next에서 약속된 함수 이름임

  const data = "hello";

  // 객체 안에 프롭스라는 객체로 리턴해야함
  // 리턴값은 props라는 객체 프로퍼티를 포함하는 단 하나의 객체여야함.
  // 객체 안에 객체!!
  // 문법이라고 생각하자
  return { props: { data } };

  // 순서
  // 1. index 페이지에 접속 요청이 발생
  // 2. getServerSideProps 함수가 실행
  // 3. 밑에 Home 컴포넌트가 실행
};

// props의 타입을 정해보자.
// next는 기본적으로 제공하는 타입이 많음
// InfetgetServerSidePropsType 이라고 자동으로 getServerSideProps 함수의 반환값의 타입을 자동으로 추론해주는 타입
// 그리고 나서 generic으로 typeof getServerSideProps 하면 잘 된다.
export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // 이 페이지 컴포넌트는 총 2번 실행됨.
  // 서버측에서 사전 렌더링이 될때 1번,
  // JS bundle을 실행(hydration) 할 때 브라우저에서 1번

  // Home 페이지 컴포넌트 밖에 있는 getServerSideProps 함수에서 window라는 값에 접근할 수 없었던 이유가 여기서도 그대로 적용됨.
  // 서버에서 사전 렌더링이 발생하니까 브라우저에서만 쓸 수 있는 window 이런걸 못 읽는 것임.
  // 여러 해결법이 있지만, 지금은 useEffect 사용해서 해결.

  // useEffect는 현재 컴포넌트가 마운트 되면 실행임
  // 마운트: 화면에 나타난 이후에!!
  // 따라서 서버측에서는 실행하지 않음.
  useEffect(() => {
    console.log(window);
  }, []);

  console.log(data);
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};

````