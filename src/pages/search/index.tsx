import SearchableLayout from '@/components/searchable-layout';
import { ReactNode } from 'react';
import BookItem from '@/components/book-item';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import fetchSearchBooks from '@/lib/fetch-search-books';
import Head from 'next/head';

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  // 브라우저 요청한 모든 데이터가 context 안에 들어가 있음.

  const { q } = context.query;
  if (!q || Array.isArray(q)) return;

  const searchBooks = await fetchSearchBooks(q);

  return {
    props: {
      searchBooks,
    },
  };
};

export default function Page({
  searchBooks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>한입 북스 - 검색 결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요"
        />
      </Head>
      {searchBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
