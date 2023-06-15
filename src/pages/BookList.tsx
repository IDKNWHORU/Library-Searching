import { useEffect, useState } from "react";
import { APIRequest, BookAPIRequest } from "../apis/Request";
import { BookList } from "../apis/BookList.api";
import { Book } from "../apis/models/Library.type";

class FetchAPI implements APIRequest {
  get(url: string): Promise<Response> {
    return fetch(url);
  }
}

const request = BookAPIRequest.of(new FetchAPI());

export const BookListPage = () => {
  const [keyword, setKeyword] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const bookList = BookList.getInstance(request);

  useEffect(() => {
    if(keyword === "") return;
    
    bookList.getBookList<Book>(keyword).then((res) => {
      setBooks(res);
    });
  }, [bookList, keyword]);

  const bookListItems = books.map(({ title, subtitle, image, url }) => {
    return (
      <article>
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
