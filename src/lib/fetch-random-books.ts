import { BookDataType } from '@/types';
import { endpoints } from './endpoints';

export default async function fetchRandomBooks(): Promise<BookDataType[]> {
  const url = endpoints.randomBooks;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error();
    }
    const resData = res.json();
    return resData;
  } catch (error) {
    console.error(error);
    return [];
  }
}
