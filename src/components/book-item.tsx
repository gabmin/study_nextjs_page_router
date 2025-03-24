import type { BookDataType } from '@/types';
import Link from 'next/link';
import { css } from '@emotion/react';

export default function BookItem({
  id,
  title,
  subTitle,
  description,
  author,
  publisher,
  coverImgUrl,
}: BookDataType) {
  return (
    <Link
      href={`/book/${id}`}
      css={css`
        display: flex;
        gap: 15px;
        padding: 20px 10px;
        border-bottom: 1px solid rgb(220, 220, 220);
        color: black;
        text-decoration: none;
      `}
    >
      <img
        src={coverImgUrl}
        css={css`
          width: 80px;
        `}
      />
      <div>
        <div
          css={css`
            font-weight: bold;
          `}
        >
          {title}
        </div>
        <div
          css={css`
            word-break: keep-all;
          `}
        >
          {subTitle}
        </div>
        <br />
        <div
          css={css`
            color: gray;
          `}
        >
          {author} | {publisher}
        </div>
        {/* <div>{description}</div> */}
      </div>
    </Link>
  );
}
