# Library-Searching
his project is a test of application implementation for [Trevari](https://m.trevari.co.kr/).

## Scripts
### Develop
``` sh
npm run dev
```

### Test
``` sh
npm run test
```

## Check List
1. Implement a book search website.
- [X] It has two screens: [List] and [Details].
- [X] When a user selects a result from the [List] screen, the [Details] screen is displayed, showing the detailed information.
2. Basic requirements
- [X] Develop using TypeScript and React (CRA).
- [X] Use GitHub issues to manage issues.
3. Preferred requirements
- [X] Write unit tests.
- [ ] Implement using Next.js.
4. Detailed implementation
    
    a. [List] Displays book information that has been searched for a specific keyword.
    - [X] The following properties must be displayed on the screen from the data received in JSON.
    ```JSON
    {
        "title": "MongoDB in Action, 2nd Edition",
        "subtitle": "Covers MongoDB version 3.0",
        "image": "https://itbook.store/img/books/9781617291609.png",
        "url": "https://itbook.store/books/9781617291609"
    }
    ```
    - [X] Implement infinite scrolling.
    - [X] Allow users to enter specific keywords. Keywords can be up to two and are separated by the "or" and "not" operators.
        - The "or(|)" operator displays the results of the search for each keyword. (e.g. "tdd|javascript": the results of the search for tdd and the results of the search for javascript are combined.)
        - The "not(-)" operator searches for books that contain the previous keyword in the title, but do not contain the following keyword. (e.g. "tdd-javascript": searches for books that contain the tdd keyword in the title, but do not contain the javascript keyword.)
    
    b. [Detail]: Displays the detailed information of the selected book from the book list.
    - [X] The following properties must be displayed on the screen from the data received in JSON.
    ```JSON
    {
	    "title":"MongoDB in Action, 2nd Edition",
	    "subtitle":"Covers MongoDB version 3.0",
	    "authors":"Kyle Banker, Peter Bakkum, Shaun Verch, Douglas Garrett, Tim Hawkins",
	    "publisher":"Manning",
	    "pages":"480",
	    "rating":"4",
	    "desc":"MongoDB in Action, 2nd Edition is a completely revised and updated version. It introduces MongoDB 3.0 and the document-oriented database model. This perfectly paced book gives you both the big picture you'll need as a developer and enough low-level detail to satisfy system engineers.MongoDB in ...",
	    "price":"$19.99",
	    "image":"https://itbook.store/img/books/9781617291609.png",
    }
    ```
## API
- API documents
    - https://api.itbook.store/
- Book List and Search
    - `https://api.itbook.store/1.0/search/{keyword}/{pageNumber}`
- Book Detail
    - `https://api.itbook.store/1.0/books/{isbn13}`