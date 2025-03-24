import { ReactNode } from 'react';
import Link from 'next/link';
import { css } from '@emotion/react';

export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div
      css={css`
        background-color: #fff;
        max-width: 600px;
        min-height: 100vh;
        margin: 0 auto;
        box-shadow: rgba(100, 100, 100, 0.2) 0 0 29px 0;
        padding: 0 15px;
      `}
    >
      <header
        css={css`
          height: 60px;
          font-size: 18px;
          font-weight: bold;
          line-height: 60px;
          a {
            text-decoration: none;
            color: black;
          }
        `}
      >
        <Link href={'/'}>📚 ONBITE BOOKS</Link>
      </header>
      <main
        css={css`
          padding-top: 10px;
        `}
      >
        {children}
      </main>
      <footer
        css={css`
          padding: 100px 0;
          color: gray;
        `}
      >
        제작 @winderlood
      </footer>
    </div>
  );
}
