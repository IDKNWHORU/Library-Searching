import { useEffect, useState } from "react";
import { BookAPIRequest } from "../apis/Request";
import { FetchAPI } from "../apis/utils/fetch";
import { BookDetail } from "../apis/BookDetail.api";
import { BookInformation } from "../apis/models/Library.type";

const request = BookAPIRequest.of(new FetchAPI());
const bookDetailInstance = BookDetail.getInstance(request);

export const BookDetailInformationPage = ({ id }: { id: string }) => {
  const [info, setInfo] = useState<BookInformation>({
    title: "",
    subtitle: "",
    authors: "",
    publisher: "",
    pages: "",
    rating: "",
    desc: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    bookDetailInstance.getBook<BookInformation>(id).then((res) => {
      setInfo(res);
    });
  }, [id]);
  return (
    <>
      <article>
        {info.title === "" ? (
          "loading"
        ) : (
          <>
            <h2>{info.title}</h2>
            <h3>{info.subtitle}</h3>
            <div>
              <p>{info.authors}</p>
              <p>{info.publisher}</p>
              <p>{info.pages}</p>
              <p>{info.rating}</p>
              <p>{info.desc}</p>
              <p>{info.price}</p>
            </div>
            <figure>
              <img src={info.image} alt={info.title} />
            </figure>
          </>
        )}
      </article>
    </>
  );
};
