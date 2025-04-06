# Next.js Page Router

## 목차

#### 1. [기타 정보](#기타-정보)

#### 2. [사전 렌더링](#2-사전-렌더링)

#### 3. [페이지 라우팅](#3-페이지-라우팅)

#### 4. [프리 페칭](#4-프리-페칭)

#### 5. [API Routes](#5-api-routes)

#### 6. [레이아웃 설정](#6-레이아웃-설정)

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

## 네비게이팅 (Navigating)

```typescript
import Link from "next/link";

export default function Page() {
  const router = useRouter();

  return (
    <>
      <Link href={"/"}>Home</Link>
      <Link htef={"/book"}>Book</Link>
      <button
        onClick={() => {
          router.push("/search");
        }}
      >
        search 페이지 이동
      </button>
    </>
  );
}
```

### Link Compoent

Link 컴포넌트를 사용하여 클리언트 사이드 네비게이션(CSR) 방식처럼 수행하도록 한다.

또한, 자동으로 프리페칭이 적용되어 성능 최적화에 도움을 준다.

정적인 내비게이션에 적합하다.

<br/>

### rotuer.push()

Next.js에서 제공하는 프로그래매틱한 내비게이션 방식

동적 라우팅이 가능하며 app router의 경우 서버 액션과 결합이 가능하다

| 방식            | 사용예시                                | 장점                                 | 단점                     |
| --------------- | --------------------------------------- | ------------------------------------ | ------------------------ |
| `<Link>`태그    | 정적 내비게이션 (메뉴, 헤더, 사이드바)  | 자동 프리페칭, 성능최적화            | 동적 네비게이팅이 어려움 |
| `router.push()` | 로그인 후 리다이렉트, 버튼 클릭 후 이동 | 동적 네비게이팅 가능, 로직 추가 가능 | 프리페칭 지원 안됨       |

<br/>

## 프리페칭 (Pre-Fetching)

사용자가 보고 있는 페이지에 관련된 페이지를 미리 다 불러놓는 기능. 이를 통해 빠르게 페이지 이동이 가능함.

**개발 모드에서는 프리페칭이 동작하지 않는다.**

![프리페칭](./public/스크린샷%202025-04-05%20오후%204.45.20.png)

일반적으로는 TTI를 줄이기 위해 next.js는 페이지별로 JS Bundle 파일을 생성하며 현재 페이지에 필요한 JS Bundle 파일만 전달된다.

![페이지별 번들파일](./public/스크린샷%202025-04-05%20오후%204.48.40.png)
![번들파일 요청](./public/스크린샷%202025-04-05%20오후%204.49.34.png)

프리페칭을 통해 사전에 미리 불러와 빠르게 페이지 전환을 시켜준다.
![프리페칭2](./public/스크린샷%202025-04-05%20오후%204.52.39.png)

프로그래매틱하게 페이지 이동에서도 프리페칭이 가능하다.

```typescript
export default function Page() {
  const router = useRouter();

  const pushPage = () => {
    router.push("/search");
  };

  useEffect(() => {
    router.prefetch("/search");
  }, []);

  return <button onClick={pushPage}>페이지 이동</button>;
}
```

프리페칭을 사용하고 싶지 않는 경우에는 prefetch를 false로 명시해주면 된다.

```typescript
export default function Page() {
  return (
    <Link href={"/search"} prefetch={false}>
      페이지 이동
    </Link>
  );
}
```

<br/>

## API Routes

```
pages
ㄴ api
  ㄴ example.ts
```

api 폴더 안에 api request 관련 파일을 생성하면 api routes로써 동작하게 한다.

즉, `localhost:3000/api/example`로 접속하면 `example.ts` 안에 있는 로직이 실행된다.

특별한 상황이 있는 경우가 아니면 잘 사용하지 않는다.

https://nextjs.org/docs/pages/building-your-application/routing/api-routes

<br/>

## 레이아웃 설정

### 글로벌 레이아웃 설정

header와 footer 같은 global 설정을 하기 위해 children을 props로 넘겨준다.

```typescript
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalLayout>
        <Component {...pageProps} />
      </GlobalLayout>
    </>
  );
}
```

<br/>

### 페이지별 레이아웃 설정

```typescript
// 레이아웃 컴포넌트 생성
export default function seachbarLayout({ children }: { children: ReactNode }) {
  return <>layout</>;
}

// 필요한 페이지에 레이아웃 적용
export default function Home() {
  return <></>;
}

Home.getLayout = (page: ReactNode) => {
  return <SearchbarLayout>{page}</SearchbarLayout>;
};

// app 컴포넌트에 조건문 적용
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
  return (
    <>
      <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>
    </>
  );
}
```

<br/>

<hr/>
출처: 한 입 크기로 잘라먹는 Next.js - 이정환
