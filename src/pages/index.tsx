import { css } from '@emotion/react';
import SearchableLayout from '@/components/searchable-layout';
import { ReactNode } from 'react';
import BookItem from '@/components/book-item';
import { InferGetServerSidePropsType } from 'next';
import fetchBooks from '@/lib/fetch-books';
import fetchRandomBooks from '@/lib/fetch-random-books';

// 자동으로 SSR 방식으로 동작하도록 변경
// 컴포넌트보다 먼저 실행되어, 컴포넌트에 필요한 데이터를 불러오는 함수
// 이 함수는 서버쪽에서만 실행되기 때문에 props로 리턴하지 않으면 접근할 수 없다. (window 객체 사용 불가능)
// props type: InferGetServerSidePropsType<typeof getServerSideProps>
export const getServerSideProps = async () => {
  const [allBooks, recommendBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  // 리턴 값에는 반드시 props라는 키가 있어야함
  return {
    props: {
      allBooks,
      recommendBooks,
    },
  };
};

// SSG 정적 사이트 생성 방식
// build time에 한번만 실행되기 떄문에 새고침을 해도 아무런 동작을 하지 않음
// props type: InferGetStaticPropsType<typeof getStaticProps>
// export const getStaticProps = () => {
//   return {
//     props: {},
//   };
// };

// 서버 사이드에서 1번 Hydration 과정에서 1번 총 2번 실행된다. (window 객체 사용 불가능 - 서버 사이드일 경우)
// useEffect를 사용하면 서버측에서 실행되지 않아서 window 객체를 사용할 수 있다.
// InferGetServerSidePropsType - 자동으로 serverSideProps의 타입을 추론해준다.
// 개발환경에서는 새로고침마다 실행됨 (preview 환경에서 정상적으로 동작함)
export default function Home({
  allBooks,
  recommendBooks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 20px;
        h3 {
          margin-bottom: 0;
        }
      `}
    >
      <section>
        <h3>지금 추천하는 도서</h3>
        <div>
          {recommendBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </div>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <div>
          {allBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </div>
      </section>
    </div>
  );
}

// 개별적으로 레이아웃을 추가하기 위해서는 Home 함수(객체)에 getLayout키를 추가해준다.
// __app.tsx에서 getLayout 타입을 확장시켜준다.
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
