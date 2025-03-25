import fetctTargetBooks from '@/lib/fetch-target-books';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import style from './[id].module.css';
import { useRouter } from 'next/router';

// css파일을 그냥 가져오게되면 클래스네임명이 중독되어 충돌되는 문제가 발생하여
// 임의로 변환해주는 module 기능을 사용해서 가져와야함
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

// 동적 경로에서 SSG를 적용하기 위해서는 임의의 path를 지정해줘야한다.
// getStaticPaths을 통해 지정해줄 수 있다.
// fallback은 예상치 못한 경우가 발생할 경우 대비책을 지정할 수 있는 기능이다.
// fallback: false 일 경우 404페이지가 노출됨
// fallback: 'blocking'은 마치 SSR이 동작하는 것처럼 즉각적으로 생성해서 렌더링해준다. (.next 폴더에 생성된 파일이 저장됨)
// fallback: true 일 경우 데이터 없이 컨포넌트만 렌더링하고 추후에 데이터를 응답받으면 그때 리렌더링한다.
// 데이터를 응답 받기 전까지를 fallback 상태라고하며 router.isFallback를 통해 판별할 수 있다.
// export const getStaticPaths = () => {
//   return {
//     paths: [
//       { params: { id: '1' } },
//       { params: { id: '2' } },
//       { params: { id: '3' } },
//     ],
//     fallback: false,
//   };
// };

export default function Page({
  targetBook,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  if (router.isFallback) return '로딩중입니다...';
  if (!targetBook) return '문제가 발생하였습니다. 다시 시도해주세요.';

  const { title, subTitle, author, publisher, description, coverImgUrl } =
    targetBook;

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
