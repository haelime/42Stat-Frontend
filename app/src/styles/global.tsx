import { css } from '@emotion/react';

export const global = () => css`
  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/Pretendard-Thin.woff') format('woff');
    font-weight: 100;
  }

  /* @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/Pretendard-ExtraLight.woff') format('woff');
    font-weight: 200;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/Pretendard-Light.woff') format('woff');
    font-weight: 300;
  } */

  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/Pretendard-Medium.woff') format('woff');
    font-weight: 500;
  }

  /* @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/Pretendard-SemiBold.woff') format('woff');
    font-weight: 600;
  } */

  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/Pretendard-Bold.woff') format('woff');
    font-weight: 700;
  }

  /* @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/Pretendard-ExtraBold.woff') format('woff');
    font-weight: 800;
  } */

  /* @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/Pretendard-Black.woff') format('woff');
    font-weight: 900;
  } */

  html {
    font-family: 'Pretendard', sans-serif;
    font-display: fallback; // for UX
    font-size: 62.5%; // 1rem = 10px
  }

  body {
    font-size: 1.4rem;
    background-color: #e7e8ed; // body가 아닌 다른 곳에 넣으면 스크롤 시 흰색이 보임
  }
`;
