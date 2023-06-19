import { useEffect, useRef, useState } from "react";
import { BookList } from "../apis/BookList.api";
import { BookAPIRequest } from "../apis/Request";
import { Book } from "../apis/models/Library.type";
import { FetchAPI } from "../apis/utils/fetch";

const request = BookAPIRequest.of(new FetchAPI());

export const BookListPage = ({
  setRoute,
}: {
  setRoute: (isbn13: string) => void;
}) => {
  const [keyword, setKeyword] = useState<string>("");
  const [books, setBooks] = useState<Book[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const bookListRef = useRef<BookList | null>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clickArticle = (isbn13: string) => {
    setRoute(`${isbn13}`);
  };

  const loadNextPage = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isLastPage) {
        setPageNumber(pageNumber + 1);
      }
    });
  };

  useEffect(() => {
    bookListRef.current = BookList.getInstance(request);
  }, []);

  useEffect(() => {
    const getBooks = async () => {
      if (bookListRef.current === null) return;
      if (keyword.length < 2) return;

      if (keyword.includes("|")) {
        const keywords = keyword.split("|");
        const getBooksKeywords = keywords.map((keyword) =>
          bookListRef.current?.getBookList<Book>(keyword, `${pageNumber}`)
        );

        const newBooks = await Promise.all(getBooksKeywords);
        const books = newBooks.flat() as Book[];

        if (books.length === 0) {
          setIsLastPage(true);
        } else {
          setBooks((prevBooks) => [...prevBooks, ...books]);
        }
      } else if (keyword.includes("-")) {
        const [includedKeyword, excludedKeyword] = keyword.split("-");

        bookListRef.current
          .getBookList<Book>(includedKeyword, `${pageNumber}`)
          .then((newBooks) => {
            if (newBooks.length === 0) {
              setIsLastPage(true);
            } else {
              const books = newBooks.filter(
                (book) =>
                  !book.title
                    .toLowerCase()
                    .includes(excludedKeyword.toLowerCase())
              );
              setBooks((prevBooks) => [...prevBooks, ...books]);
            }
          });
      } else {
        bookListRef.current
          .getBookList<Book>(keyword, `${pageNumber}`)
          .then((newBooks) => {
            if (newBooks.length === 0) {
              setIsLastPage(true);
            } else {
              setBooks((prevBooks) => [...prevBooks, ...newBooks]);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    };

    getBooks();
  }, [keyword, pageNumber]);

  useEffect(() => {
    const observer = new IntersectionObserver(loadNextPage);

    if (scrollRef.current && books.length > 0) {
      observer.observe(scrollRef.current);
    }

    return () => {
      if (scrollRef.current && books.length > 0) {
        observer.unobserve(scrollRef.current);
      }
    };
  }, [books]);

  const bookListItems = books.map(({ title, subtitle, image, url, isbn13 }) => {
    return (
      <article
        key={isbn13}
        onClick={() => {
          clickArticle(isbn13);
        }}
      >
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <img src={image} alt={title} />
        <p>
          <a href={url}>{url}</a>
        </p>
      </article>
    );
  });

  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          if (e.target.value.split(/[-|]/).length > 2) {
            alert('최대 2개의 키워드까지만 입력할 수 있습니다.');
            e.target.value = e.target.value.slice(0, -1);
            return;
          }
          
          if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
          }

          debounceTimeoutRef.current = setTimeout(() => {
            setKeyword(e.target.value);
            setBooks([]);
            setPageNumber(1);
            setIsLastPage(false);
          }, 500);
        }}
      ></input>
      {bookListItems}
      <div ref={scrollRef} style={{ height: "1px" }}></div>
    </>
  );
};
