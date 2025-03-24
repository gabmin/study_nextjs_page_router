import { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';

export default function SearchableLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  const { q } = router.query;

  const [search, setSearch] = useState('');

  useEffect(() => {
    if (q && !Array.isArray(q)) {
      setSearch(q);
    }
  }, [q]);

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      onSubmit();
    }
  };
  return (
    <div>
      <div
        css={css`
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        `}
      >
        <input
          placeholder="검색어를 입력해주세요..."
          onKeyDown={onKeyDown}
          onChange={onChangeSearch}
          value={search}
          css={css`
            flex: 1;
            padding: 15px;
            border-radius: 5px;
            border: 1px solid rgb(220, 220, 220);
          `}
        />
        <button
          css={css`
            width: 80px;
            border-radius: 5px;
            border: none;
            background-color: rgb(37, 147, 255);
            color: white;
            cursor: pointer;
          `}
          onClick={onSubmit}
        >
          검색
        </button>
      </div>
      {children}
    </div>
  );
}
