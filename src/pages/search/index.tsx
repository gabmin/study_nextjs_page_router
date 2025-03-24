import SearchableLayout from '@/components/searchable-layout';
import { ReactNode } from 'react';
import books from '@/mock/books.json';
import BookItem from '@/components/book-item';

export default function Page() {
  return (
    <>
      {books.map((book) => {
        <BookItem key={book.id} {...book} />;
      })}
    </>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
