export const getBookList = async (keyword: string, pageNumber?: string) => {
    const baseUrl = `https://api.itbook.store/1.0/search/${keyword}`;
    const bookListUrl = (pageNumber) ? `https://api.itbook.store/1.0/search/${keyword}`.concat(`/${pageNumber}`): baseUrl;
    
    const response = await fetch(bookListUrl);
    const data = await response.json();
    return data;
}