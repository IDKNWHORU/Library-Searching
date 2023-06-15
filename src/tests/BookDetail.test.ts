import { BookDetail } from "../apis/BookDetail.api";
import { BookAPIRequest } from "../apis/Request";
import { FetchTestAPI } from "./test.util";

test("search book detail [isbn13: 9781617291609] ", async () => {
  const bookTestApiRequest = BookAPIRequest.of(new FetchTestAPI());
  const mongoDBBook = await BookDetail.getInstance(bookTestApiRequest).getBook(
    "9781617291609"
  );

  expect(mongoDBBook).toEqual({
    error: "0",
    title: "MongoDB in Action, 2nd Edition",
    subtitle: "Covers MongoDB version 3.0",
    authors:
      "Kyle Banker, Peter Bakkum, Shaun Verch, Douglas Garrett, Tim Hawkins",
    publisher: "Manning",
    language: "English",
    isbn10: "1617291609",
    isbn13: "9781617291609",
    pages: "480",
    year: "2016",
    rating: "4",
    desc: "MongoDB in Action, 2nd Edition is a completely revised and updated version. It introduces MongoDB 3.0 and the document-oriented database model. This perfectly paced book gives you both the big picture you&#039;ll need as a developer and enough low-level detail to satisfy system engineers.MongoDB in ...",
    price: "$19.99",
    image: "https://itbook.store/img/books/9781617291609.png",
    url: "https://itbook.store/books/9781617291609",
    pdf: {
      "Chapter 1": "https://itbook.store/files/9781617291609/chapter1.pdf",
      "Chapter 4": "https://itbook.store/files/9781617291609/chapter4.pdf",
    },
  });
});
