import { useEffect, useState } from "react";
import { BookList } from "../apis/BookList.api";
import { BookAPIRequest } from "../apis/Request";
import { Book } from "../apis/models/Library.type";
import { FetchAPI } from "../apis/utils/fetch";

const request = BookAPIRequest.of(new FetchAPI());

export const BookListPage = ({setRoute}: {setRoute: (isbn13: string)=> void}) => {
  const [keyword, setKeyword] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const bookList = BookList.getInstance(request);

  const clickArticle = (isbn13: string) => {
    setRoute(`${isbn13}`);
  };

  useEffect(() => {
    if (keyword === "") return;

    bookList.getBookList<Book>(keyword).then((res) => {
      setBooks(res);
    });
  }, [bookList, keyword]);

  const bookListItems = books.map(({ title, subtitle, image, url, isbn13 }) => {
    return (
      <article
        key={isbn13}
        onClick={(_) => {
          clickArticle(isbn13);
        }}
      >
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <img src={image} alt={title} />
        <p>
          <a href={url}>{url}</a>
        </p>
      </article>
    );
  });

  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
      ></input>
      {bookListItems}
    </>
  );
};
