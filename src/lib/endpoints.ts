let defaultUrl = 'http:localhost:12345';

if (process.env.NODE_ENV === 'production') {
  defaultUrl = 'https://onebite-books-server-dun-beta.vercel.app/';
}

export const endpoints = {
  allBooks: `${defaultUrl}/book`,
  randomBooks: `${defaultUrl}/book/random`,
  searchBooks: `${defaultUrl}/book/search`,
};
