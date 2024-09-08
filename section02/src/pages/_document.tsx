import { Html, Head, Main, NextScript } from "next/document";

// 모든 페이지에 적용되어야하는 메타 태그, 폰트 불러오기, 캐릭터 셋, 구글 어낼러틱스
// 페이지 전체에 적용되는 html 태그 관리

export default function Document() {
  return (
    <Html lang="kr">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
