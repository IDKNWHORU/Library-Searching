export interface APIRequest {
    get(url: string): Promise<Response>;
}

export class BookAPIRequest {
    private library: APIRequest;

    private constructor(library: APIRequest) {
        this.library = library;
    }

    public static of(library: APIRequest) {
        return new BookAPIRequest(library);
    }

    public async get(url: string) {
        const response = await this.library.get(url);
        return response;
    }
}