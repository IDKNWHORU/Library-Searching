import { BookAPIRequest } from "./Request";

interface APIResponse<T> {
    error: string;
    books: T[];
}

export class BookList {
    private static instance: BookList;
    private readonly request: BookAPIRequest;

    private constructor(request: BookAPIRequest) {
        this.request = request;
    }

    static getInstance(request: BookAPIRequest) {
        if(!BookList.instance) {
            return new BookList(request);
        }

        return this.instance;
    }

    async getBookList<T>(keyword: string, pageNumber?: string): Promise<T[]> {
        const baseUrl = `https://api.itbook.store/1.0/search/${keyword}`;
        const bookListUrl = (pageNumber) ? `${baseUrl}/${pageNumber}`: baseUrl;

        const response = await this.request.get(bookListUrl);
        const data:APIResponse<T> = await response.json();

        if(data.error !== "0") {
            throw new Error(data.error);
        }

        return data.books;
    }
}