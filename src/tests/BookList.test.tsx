import fetch from "node-fetch";
import { BookList } from "../apis/BookList.api";
import { APIRequest, BookAPIRequest } from "../apis/Request";
import { Book } from "../apis/models/Library.type";

class FetchAPI implements APIRequest {
  get(url: string): Promise<any> {
    return fetch(url);
  }
}

test("search book list [keywords: mongodb]", async () => {
  const bookTestApiRequest = BookAPIRequest.of(new FetchAPI());
  const mongodbBooks = await BookList.getInstance(
    bookTestApiRequest
  ).getBookList<Book>("mongodb");

  expect(mongodbBooks.length > 0).toBe(true);
});

test("search book list empty keyword throw error", async () => {
  const bookTestApiRequest = BookAPIRequest.of(new FetchAPI());

  await expect(async () => {
    await BookList.getInstance(bookTestApiRequest).getBookList<Book>("");
  }).rejects.toThrowError(new Error("[search] Invalid request"));
});
