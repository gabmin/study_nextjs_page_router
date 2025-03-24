import { css } from '@emotion/react';
import SearchableLayout from '@/components/searchable-layout';
import { ReactNode } from 'react';
import books from '@/mock/books.json';
import BookItem from '@/components/book-item';

export default function Home() {
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
          {books.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </div>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <div>
          {books.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
