# Next.js Page Router

## 목차

#### 1. [사전 렌더링](#1-사전-렌더링)

#### 2. [페이지 라우팅](#2-페이지-라우팅)

#### 3. [네비게이팅](#3-네비게이팅)

#### 4. [프리 페칭](#4-프리-페칭)

#### 5. [API Routes](#5-api-routes)

#### 6. [레이아웃 설정](#6-레이아웃-설정)

#### 7. [사전 렌더링과 데이터 페칭](#7-사전-렌더링과-데이터-페칭)

#### 8. [SEO 설정](#8-seo-설정)

<br/>

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

## 페이지 라우팅

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

export default function Home() {
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

## 사전 렌더링과 데이터 페칭

기존 CSR 방식은 렌더링 이후에 데이터 페칭이 일어나 FCP가 늘어나는 단점이 존재했다.

![CSR데이터페칭](./public/스크린샷%202025-04-06%20오전%2011.23.49.png)
![CSR데이터페칭2](./public/스크린샷%202025-04-06%20오전%2011.23.57.png)

next.js에서는 사전 렌더링시에 데이터 페칭을 실행하여 빠르게 화면을 보여줄 수 있다.

![nextjs데이터패칭](./public/스크린샷%202025-04-06%20오전%2011.26.47.png)

만약 백엔드 서버의 상태가 좋지 않거나 요청 데이터가 너무 큰 경우에는 Build Time에 미리 데이터 패칭을 하는 방식으로 사전렌더링을 개선할 수도 있다.

![빌드타임데이터패칭](./public/스크린샷%202025-04-06%20오전%2011.30.33.png)
![사전렌더링방식](./public/스크린샷%202025-04-06%20오전%2011.31.04.png)

<br/>

### 서버사이드 렌더링 (SSR)

`getServerSideProps`함수는 서버측에서 실행되어 컴포넌트에 필요한 데이터를 불러온다.

서버측에서만 실행되기 때문에 `window`같은 브라우저에서만 실행할 수 있는 로직은 사용할 수 없다.

하지만, 페이지 컴포넌트도 하이드레이션 과정에서 실행되기 때문에 `window` 객체에 접근할 수 없다.

그래서 useEffect로 `window` 객체에 접근할 수 있다.

![SSR](./public/스크린샷%202025-04-04%20오전%2011.09.53.png)

```typescript
export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const params = context.query.id;

  const data = await fetch(`${url}/${params}`);

  return {
    props: {
      data,
    },
  };
};

export default function Page({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useEffect(() => {
    console.log(window);
  }, []);

  return <></>;
}
```

<br/>

### 정적 사이트 생성 (SSG)

SSR로 동작할 때, 서버 응답이 오래걸리는 경우 FCP가 늘어나게 되는데 이러한 문제를 SSG를 통해 해결할 수 있다.

빌드 타임에 미리 페이지를 사전렌더링하여 빠르게 화면을 보여준다.

하지만, 빌드타임에 생성된 페이지이기 때문에 똑같은 페이지만 응답하며 최신 데이터 반영은 어려운 단점이 있다.

즉, `getStaticProps`는 한번만 실행된다. 또한 **개발모드에서는 동작하지 않는다.**

params 데이터는 빌드타임에는 알 수 없기떄문에 `getStaticProps`에서는 params 값을 사용할 수 없다. 이런 경우에는 기존 리액트에서 사용하는 방식대로 로직을 구성해야한다.

![빌드타임데이터패칭](./public/스크린샷%202025-04-06%20오전%2011.30.33.png)
![ssg](./public/스크린샷%202025-04-07%20오전%2011.15.21.png)

```typescript
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const data = await fetch(url);

  return {
    props: {
      data,
    },
  };
};

export default function Page({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const id = router.query.id;

  const [state, setState] = useState({});

  useEffect(() => {
    if (id) {
      const data = await fetch(`${url}/${id}`);
      setState(data);
    }
  }, [id]);

  return <>page</>;
}
```

임의로 params 데이터를 설정해서 동적 경로에 SSG를 적용할 수 있다.

![동적경로SSG](./public/스크린샷%202025-04-07%20오전%2011.31.48.png)

```typescript
export const getStaticPath = async () => {
  return {
    paths: [
      {
        params: { id: "1" },
        params: { id: "2" },
        params: { id: "3" },
      },
    ],
    // paths값에 설정하지 않은 페이지에 접근하는 경우에는 어떻게 할지에 대한 설정
    fallback: false, // 404페이지가 노출됨
    fallback: "blocking", //마치 SSR이 동작하는 것처럼 즉각적으로 생성해서 렌더링해준다. (.next 폴더에 생성된 파일이 저장됨)
    fallback: true, // 데이터 없이 컴포넌트만 렌더링하고 추후에 데이터를 응답받으면 그때 리렌더링한다
    // router.isFallback를 사용하여 데이터 응답 여부를 판별할 수 있다.
  };
};

export default function Page({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const id = router.query.id;

  if (router.isFallback) return "로딩중입니다.";

  const [state, setState] = useState({});

  useEffect(() => {
    if (id) {
      const data = await fetch(`${url}/${id}`);
      setState(data);
    }
  }, [id]);

  return <>page</>;
}
```

<br/>

### 증분정적재생성(ISR)

SSG 방식으로 생서오딘 정적 페이지를 일정 시간을 주기로 다시 생성하는 기술

기존의 SSG 방식과 기존의 SSR 방식이 결합된 기술

`revalidate`값만 설정해주면 사용 가능하다.

SSG의 연장선이기 때문에 **개발모드에서는 동작하지 않는다.**

![ISR](./public/스크린샷%202025-04-08%20오후%203.43.17.png)

```typescript
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const data = await fetch(url);

  return {
    props: {
      data,
    },
    revalidate: 3,
  };
};

export default function Page({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const id = router.query.id;

  const [state, setState] = useState({});

  useEffect(() => {
    if (id) {
      const data = await fetch(`${url}/${id}`);
      setState(data);
    }
  }, [id]);

  return <>page</>;
}
```

<br/>

### 주문형 재검증 (On-Demand ISR)

ISR 방식은 사용자 행동에 따라 업데이트가 되는 페이지에는 사용하기가 어려운 단점이 존재한다.

revalidate 설정 값이 적용되기까지 업데이트가 안될 수 있는 문제가 생길 수 있고
![onDemandISR](./public/스크린샷%202025-04-08%20오후%203.48.41.png)

짧은 revalidate로 자주 업데이트가 되는 문제가 생길 수도 있다.

![onDemandISR2](./public/스크린샷%202025-04-08%20오후%203.51.25.png)

SSR 방식을 사용할 수도 있지만, 매번 요청할떄마다 사전 렌더링을 실행하여 응답시간이 늦어질 수도 있고, 요청이 많이 들어오는 경우에는 서버에 부하가 생길 수도 있다. 따라서, 최대한 정적페이지로 만드는게 좋다.

API Routes를 통해 handler를 만들어준다. 즉, 초기화 해주는 api를 만들어 요청해서 초기화가 되게끔 사용한다.

```typescript
// pages/api/revalidate.ts

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // 특정 페이지 지정
    await res.revalidate("/");
    return res.json({ revalidate: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("Revalidation Failed");
  }
}
```

<br/>

## SEO 설정

#### 파비콘 설정

public 폴더에 favicon.ico 라는 이름으로 이미지를 넣어주면 자동적으로 파비콘이 적용된다.

<br/>

#### SEO

Next.js 에서 제공하는 Head 컴포넌트를 사용하여 SEO를 적용할 수 있다.

```typescript
import Head from "next/head";

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const id = context.params?.id;

  if (!id || Array.isArray(id)) return;

  const targetBook = await fetctTargetBooks(id);

  // 데이터가 없을 경우 404페이지로 이동
  if (!targetBook) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      targetBook,
    },
  };
};

export default function Page({
  targetBook,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  // fallback 상태일 경우에는 조건문에 의해 아래의 컴포넌트가 렌더링되기 때문에 SEO가 정상적으로 적용되지 않는다.
  // 따라서 아래의 컴포넌트에도 Meta 태그를 적용시켜 줘야한다.
  if (router.isFallback)
    return (
      <>
        <Head>
          <title>한입 북스</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="한입북스" />
          <meta
            property="og:description"
            content="한입 북스에 등록된 도서들을 만나보세요"
          />
        </Head>
        로딩중 입니다..
      </>
    );
  if (!targetBook) return "문제가 발생하였습니다. 다시 시도해주세요.";

  const { title, subTitle, author, publisher, description, coverImgUrl } =
    targetBook;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div>...</div>
    </>
  );
}
```

<br/>

## 페이지 라우터 정리

<hr/>
출처: 한 입 크기로 잘라먹는 Next.js - 이정환
