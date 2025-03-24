import SearchableLayout from '@/components/searchable-layout';
import { ReactNode } from 'react';

export default function Page() {
  return <>search</>;
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
