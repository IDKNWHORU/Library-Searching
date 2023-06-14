import { BookAPIRequest } from "./Request";

export const BookList = class {
    private readonly request: BookAPIRequest;

    private constructor(request: BookAPIRequest) {
        this.request = request;
    }

    static getInstance(request: BookAPIRequest) {
        return new BookList(request);
    }

    async getBookList(keyword: string, pageNumber?: string) {
        const baseUrl = `https://api.itbook.store/1.0/search/${keyword}`;
        const bookListUrl = (pageNumber) ? `https://api.itbook.store/1.0/search/${keyword}`.concat(`/${pageNumber}`): baseUrl;
        
        const response = await this.request.get(bookListUrl);
        const data = await response.json();

        if(data.error !== "0") {
            throw new Error(data.error);
        }
        return data;
    }
}