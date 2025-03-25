import { BookDataType } from '@/types';
import { endpoints } from './endpoints';

export default async function fetchBooks(): Promise<BookDataType[]> {
  const url = endpoints.allBooks;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error();
    }
    const jsonData = await res.json();

    return jsonData;
  } catch (error) {
    console.error(error);
    return [];
  }
}
