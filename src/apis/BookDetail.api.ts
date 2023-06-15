import { BookAPIRequest } from "./Request";

export const BookDetail = class {
  private readonly request: BookAPIRequest;

  private constructor(request: BookAPIRequest) {
    this.request = request;
  }

  static getInstance(request: BookAPIRequest) {
    return new BookDetail(request);
  }

  async getBook<T>(isbn13: string): Promise<T> {
    const bookUrl = `https://api.itbook.store/1.0/books/${isbn13}`;

    const response = await this.request.get(bookUrl);
    const data = await response.json();

    if (data.error !== "0") {
      throw new Error(data.error);
    }

    return data;
  }
};
