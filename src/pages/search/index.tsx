import SearchableLayout from '@/components/searchable-layout';
import { ReactNode } from 'react';
import BookItem from '@/components/book-item';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import fetchSearchBooks from '@/lib/fetch-search-books';

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
      {searchBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
