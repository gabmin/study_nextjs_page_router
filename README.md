# Next.js Page Router

## 목차

#### 1. [기타 정보](#기타-정보)

#### 2. [사전 렌더링](#2-사전-렌더링)

#### 3. [페이지 라우팅](#3-페이지-라우팅)

<br/>

## 기타 정보

## 사전 렌더링 (Pre Rendering)

Client Side Rendering(CSR)은 페이지 이동이 매우 빠르지만 JS Bundle 파일의 사이즈가 커서 초기 로딩(FCP)이 느리며 파일을 받아오는 동안 빈화면(index.html)이 노출되어 사용성에 좋지 않은 단점이 존재한다.

![CSR](./public/스크린샷%202025-04-04%20오전%2011.07.25.png)

- FCP (First Contentful Paint)
  "요청 시작" 시점으로부터 컨텐츠가 화면에 처음 나타나는데 걸리는 시간

- TTI (Time to Interactive)
  "요청 시작" 시점으로부터 상호작용이 가능하기까지 걸리는 시간

Next.js는 사전 렌더링을 통해 Server Side Rendering(SSR) 방식으로 FCP를 줄여 사용성을 개선한다.

![SSR](./public/스크린샷%202025-04-04%20오전%2011.09.53.png)

페이지 이동시에는 CSR 방식으로 동작한다.

![페이지 이동](./public/스크린샷%202025-04-04%20오전%2011.11.37.png)

<br/>

## 페이지 라우팅 설정

pages 폴더 안에 파일을 생성하면 Nexj.js에서 자체적으로 페이지로 생성해준다.

![페이지 라우팅](./public/스크린샷%202025-04-04%20오전%2011.18.05.png)

새로운 폴더 안에 index.tsx 를 생성해서 페이지를 생성할 수도 있다.

![폴더 구조의 페이지 라우팅](./public/스크린샷%202025-04-04%20오전%2011.19.51.png)

`[id].tsx`와 같이 동적경로를 갖는 페이지도 생성 가능하다.

![동적 경로의 페이지 라우팅](./public/스크린샷%202025-04-04%20오전%2011.20.18.png)

<br/>

### 캐치 올 새그먼트 (Catch All Segment)

여러 개의 동적 경로를 같는 경우 사용한다. 하지만 `localhost:3000/book` 처럼 params 값이 없는 경우에는 에러가 발생한다.

params 값은 배열로써 넘어온다.

```
pages
ㄴ book
  ㄴ [id].tsx   =>  localhost:3000/book/4
  ㄴ [...id].tsx   =>   localhost:3000/book/4/22/56
```

<br/>

### 옵셔널 캐치 올 새그먼트 (Optional Catch All Segment)

동적 경로가 없는 경우에 에러가 발생하지 않도록 모두 허용한다.

```
pages
ㄴ book
  ㄴ [id].tsx   =>  localhost:3000/book/4
  ㄴ [[...id]].tsx   =>   localhost:3000/book/ or localhost:3000/book/4/22/56
```

<br/>

### Params 데이터 가져오기

```typescript
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();

  const { id } = router.query;

  return <></>;
}
```

## <br/>

출처: 한 입 크기로 잘라먹는 Next.js - 이정환
