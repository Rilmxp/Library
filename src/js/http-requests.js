"use strict";

import axios from "axios";
import { createBook, createAndAttachElement } from "./page-creation";
import cover_default from "../assets/img/cover_default_small.jpg";

let booksContainer = document.querySelector(".books-container");
let loader = document.querySelector(".loader");
// let booksLoaded = false;

/*
// fetch daily trending books.
function fetchDailyTrendingBooks() {
  loader.style.display = "";
  axios
    .get("https://openlibrary.org/trending/now.json")
    .then((res) => {
      const books = res.data.works;
      console.log(books);
      // console.log(books);
      // console.log(books.length);
      return books;
    })
    .then((books) => {
      loader.style.display = "none";
      books.forEach((book) => {
        /// DO NOT TOUCH ////

        // check for missing data
        BookDataHandler(book);

        // create book with default cover image when cover_id doesn't exist
        if (book.cover_i == cover_default) {
          console.log("no cover");
          createBook(
            book.title,
            book.author_name,
            booksContainer,
            cover_default,
            true
          );
        } // fetch cover and create book with it
        else {
          let coverLink;

          axios
            .get(
              `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg?default=false`
            )
            .then((res) => {
              // create book with cover, if fetched
              coverLink = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
              createBook(
                book.title,
                book.author_name,
                booksContainer,
                coverLink
              );
            })
            // image not found (error 403), create book with default cover
            .catch((error) => {
              createBook(
                book.title,
                book.author_name,
                booksContainer,
                cover_default,
                true
              );
            });
        }
      });
    })
    .catch((error) => {
      if (error.response || error.request) {
        loader.style.display = "none";
        createAndAttachElement(
          "div",
          { class: "error-message" },
          ".books-container",
          "afterbegin",
          "Books data currently unavailable. Please try again later"
        );
      }
    });
}
*/

//////////////////////////////////////////
/////////////////////////////////////////
/// REFACTORING  ////

function fetchDailyTrendingBooks() {
  loader.style.display = "";
  axios
    .get("https://openlibrary.org/trending/now.json")
    .then((res) => {
      const books = res.data.works;
      console.log(books);
      // console.log(books);
      // console.log(books.length);
      return books;
    })
    .then((books) => {
      loader.style.display = "none";

      books.forEach((book) => {
        /// DO NOT TOUCH ////

        // check for missing data
        // let bookDataHandled =
        bookDataHandler(book).then(() => {
          // console.log(book.author_name);
          createBook(
            book.title,
            book.customAuthorsProp,
            booksContainer,
            book.customCoverLinkProp
          );
        });
        // console.log("bookdatahandled", book);
        // handle and fetch cover image and create book HTML element

        // console.log(bookCoverHandler);

        // fetchBookCover(bookDataHandled).then(() => {
        //   // console.log("insideCoverHandler", bookDataHandled);
        // createBook(
        //   bookDataHandled.title,
        //   bookDataHandled.author_name,
        //   booksContainer,
        //   bookDataHandled.cover_i
        // );
        // });

        // createBook(
        //   bookCoverHandled.title,
        //   bookCoverHandled.author_name,
        //   booksContainer,
        //   bookCoverHandled.cover_i
        // );
      });
    })
    .catch((error) => {
      if (error.response || error.request) {
        loader.style.display = "none";
        createAndAttachElement(
          "div",
          { class: "error-message" },
          ".books-container",
          "afterbegin",
          "Books data currently unavailable. Please try again later"
        );
      }
    });
}

// fetch books by subject
function fetchBooksBySubject() {
  axios
    .get("https://openlibrary.org/subjects/fantasy.json")
    .then((res) => {
      const books = res.data.works;
      console.log(books);
      return books;
    })
    .then((books) => {
      loader.style.display = "none";

      books.forEach((book) => {
        console.log("cover_id", book.cover_id);

        /// DO NOT TOUCH ////

        // check for missing data
        // let bookDataHandled =
        // true for author objects
        bookDataHandler(book).then(() => {
          createBook(
            book.title,
            book.customAuthorsProp,
            booksContainer,
            book.customCoverLinkProp
          );
        });
      });
    })
    .catch((error) => {
      if (error.response || error.request) {
        loader.style.display = "none";
        createAndAttachElement(
          "div",
          { class: "error-message" },
          ".books-container",
          "afterbegin",
          "Books data currently unavailable. Please try again later"
        );
      }
    });

  // console.log("Subject", books);
  // console.log("title", books[0].title);
  // console.log("work_key", books[0].key);
  // console.log("cover_id", books[0].cover_id);
  // console.log("authors", books[11].authors);

  // const [{ name }] = books[11].authors;
  // console.log(name);

  // for (let author of books[11].authors) {
  //   console.log(author.name);
  // }
}

// fetch book description
function fetchBookDescription(book) {
  axios
    .get(`https://openlibrary.org/works/${book.key}.json`)
    .then((response) => {
      const bookInfo = response.data;
      // console.log("description", bookInfo.description);
    });
}

/// Handling of missing data for each book
// NOTE: sometimes authors are given back as an object, trending param = true in this case.
function bookDataHandler(book, subject) {
  return new Promise(function (resolve, reject) {
    // title
    if (!book.title) book.title = "Book title not available";

    // authors
    let customAuthorsProp = book.authors ?? book.author_name;
    book.customAuthorsProp = customAuthorsProp;

    if (!book.customAuthorsProp)
      book.customAuthorsProp = "Book author not available";

    if (book.authors) {
      for (let i = 0; i < book.authors.length; i++) {
        customAuthorsProp[i] = book.authors[i].name;
      }
    }

    // book.customAuthorsProp = book.customAuthorsProp.join(", ");

    if (
      Array.isArray(book.customAuthorsProp) &&
      book.customAuthorsProp.length > 1
    ) {
      book.customAuthorsProp = book.customAuthorsProp.join(", ");
      // console.log("final", book);
    }

    // book cover
    let customCoverLinkProp = book.cover_id ?? book.cover_i;
    book.customCoverLinkProp = customCoverLinkProp;

    if (!book.customCoverLinkProp) {
      book.customCoverLinkProp = cover_default;
      resolve(book);
    } else {
      // console.log(book);
      fetchBookCover(book).then(() => {
        // console.log(book);
        resolve(book);
      });
    }

    // if (!book.cover_i) {
    //   book.cover_i = cover_default;
    //   resolve(book);
    // } else {
    //   console.log(book);
    //   fetchBookCover(book).then(() => {
    //     console.log(book);
    //     resolve(book);
    //   });
    // }
  });
}

// handling and fetching of book cover
function fetchBookCover(book) {
  return (
    axios
      .get(
        `https://covers.openlibrary.org/b/id/${book.customCoverLinkProp}-L.jpg?default=false`
      )
      .then((response) => {
        // let coverLink;

        book.customCoverLinkProp = `https://covers.openlibrary.org/b/id/${book.customCoverLinkProp}-L.jpg`;
        // book.customCoverLinkProp = coverLink;
        // return book;
      })
      // image not found (error 403), create book with default cover
      .catch((error) => {
        book.customCoverLinkProp = cover_default;
      })
  );
}

export { fetchDailyTrendingBooks, fetchBooksBySubject, fetchBookDescription };
