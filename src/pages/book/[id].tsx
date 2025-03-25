import fetctTargetBooks from '@/lib/fetch-target-books';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import style from './[id].module.css';

// css파일을 그냥 가져오게되면 클래스네임명이 중독되어 충돌되는 문제가 발생하여
// 임의로 변환해주는 module 기능을 사용해서 가져와야함
export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const id = context.params?.id;

  if (!id || Array.isArray(id)) return;

  const targetBook = await fetctTargetBooks(id);

  return {
    props: {
      ...targetBook,
    },
  };
};

export default function Page({
  title,
  subTitle,
  author,
  publisher,
  description,
  coverImgUrl,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={style.container}>
      <div
        style={{ backgroundImage: `url(' ${coverImgUrl} ')` }}
        className={style.imgWrap}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.subTitle}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
