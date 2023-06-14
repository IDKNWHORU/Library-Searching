import { getBookList } from "../apis/BookList.api";

test("hello jest", async () => {
    const bookList = await getBookList("mongodb");
    expect(bookList).toEqual([]);
})