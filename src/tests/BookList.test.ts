import { BookList } from "../apis/BookList.api";
import { BookAPIRequest } from "../apis/Request";
import { Book } from "../apis/models/Library.type";
import { FetchTestAPI } from "./test.util";

test("search book list [keywords: mongodb]", async () => {
  const bookTestApiRequest = BookAPIRequest.of(new FetchTestAPI());
  const mongodbBooks = await BookList.getInstance(
    bookTestApiRequest
  ).getBookList<Book>("mongodb");

  expect(mongodbBooks.length > 0).toBe(true);
});

test("search book list empty keyword throw error", async () => {
  const bookTestApiRequest = BookAPIRequest.of(new FetchTestAPI());

  await expect(async () => {
    await BookList.getInstance(bookTestApiRequest).getBookList<Book>("");
  }).rejects.toThrowError(new Error("[search] Invalid request"));
});
