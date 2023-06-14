import fetch from "node-fetch";
import { BookList } from "../apis/BookList.api";
import { APIRequest, BookAPIRequest } from "../apis/Request";

class FetchAPI implements APIRequest {
  get(url: string): Promise<any> {
    return fetch(url);
  }
}

test("search book list [keywords: mongodb]", async () => {
  const bookTestApiRequest = BookAPIRequest.of(new FetchAPI());
  const bookListRes = await BookList.getInstance(
    bookTestApiRequest
  ).getBookList("mongodb");

  expect(bookListRes.error).toBe("0");
  expect(bookListRes.books.length > 0).toBe(true);
});

test("search book list empty keyword throw error", async () => {
  const bookTestApiRequest = BookAPIRequest.of(new FetchAPI());

  await expect(async () => {
    await BookList.getInstance(bookTestApiRequest).getBookList("");
  }).rejects.toThrowError(new Error("[search] Invalid request"));
});
