import { BookList } from "../apis/BookList.api";
import { BookAPIRequest } from "../apis/Request";
import { Book } from "../apis/models/Library.type";
import { FetchTestAPI } from "./test.util";

test("search book list [keywords: mongodb]", async () => {
  const bookTestApiRequest = BookAPIRequest.of(new FetchTestAPI());
  const mongodbBooks = await BookList.getInstance(
    bookTestApiRequest
  ).getBookList<Book>("mongodb", "1");

  expect(mongodbBooks.length > 0).toBe(true);
});

test("search book list empty keyword throw error", async () => {
  const bookTestApiRequest = BookAPIRequest.of(new FetchTestAPI());
  const empty = await BookList.getInstance(
    bookTestApiRequest
  ).getBookList<Book>("", "1");

  expect(empty.length).toBe(0);
});

test("mongodb book page one and page two list not equal", async () => {
  const bookTestApiRequest = BookAPIRequest.of(new FetchTestAPI());
  const bookListInstance = BookList.getInstance(bookTestApiRequest);
  const mongodbBooksPageOne = await bookListInstance.getBookList<Book>(
    "mongodb",
    "1"
  );
  const mongodbBooksPageTwo = await bookListInstance.getBookList<Book>(
    "mongodb",
    "2"
  );

  expect(mongodbBooksPageOne[0].isbn13).not.toEqual(
    mongodbBooksPageTwo[0].isbn13
  );
});

test("mongodb book last page is empty", async () => {
  const bookTestApiRequest = BookAPIRequest.of(new FetchTestAPI());
  const bookListInstance = BookList.getInstance(bookTestApiRequest);
  const mongodbBooksLastPage = await bookListInstance.getBookList<Book>(
    "mongodb",
    "9"
  );

  expect(mongodbBooksLastPage.length).toBe(0);
});
