"use strict";

import axios from "axios";
import {
  createBook,
  createAndAttachElement,
  createLoader,
} from "./page-creation";
import cover_default from "../assets/img/cover_default_small.jpg";

let booksContainer = document.querySelector(".books-container");
let loader = document.querySelector(".loader");
let activeBooks;
// let booksLoaded = false;

//////////////////////////////////////////
/////////////////////////////////////////
/// REFACTORING  ////

// fetch daily trending books.
function fetchDailyTrendingBooks() {
  // loader.style.display = "";
  createLoader();
  axios
    .get("https://openlibrary.org/trending/now.json")
    .then((res) => {
      const books = res.data.works;
      console.log(books);
      // console.log(books);
      // console.log(books.length);
      activeBooks = books;
      return books;
    })
    .then((books) => {
      // loader.style.display = "none";
      createLoader(true);

      books.forEach((book) => {
        // check for missing data
        bookDataHandler(book).then(() => {
          // console.log(book.author_name);
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
}

// fetch books by subject
function fetchBooksBySubject() {
  createLoader();
  axios
    .get("https://openlibrary.org/subjects/historical_fiction.json")
    .then((res) => {
      const books = res.data.works;
      console.log(books);
      activeBooks = books;
      return books;
    })
    .then((books) => {
      // loader.style.display = "none";
      createLoader(true);

      books.forEach((book) => {
        // console.log("cover_id", book.cover_id);

        /// DO NOT TOUCH ////

        // check for missing data
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
}

// fetch book description
function fetchBookDescription() {
  // console.log("active books", activeBooks);
  let bookTitle = document.querySelector(
    ".book-selected .book-title"
  ).innerText;
  let bookDescription;

  for (let activeBook of activeBooks) {
    // console.log(activeBook);
    if (activeBook.title === bookTitle) {
      console.log("activeBook", activeBook.key, activeBook.title);

      axios
        .get(`https://openlibrary.org${activeBook.key}.json`)
        .then((response) => {
          // console.log("response 1st", response.data);
          bookDescription = response.data.description;
          // console.log("book Description", bookDescription);
          // console.log("type", typeof bookDescription);

          if (!bookDescription) {
            bookDescription = "Book description not available";
          }

          if (typeof bookDescription !== "string") {
            bookDescription = bookDescription.value;
          }

          return bookDescription;
        })
        .then((response) => {
          console.log("response", response);
          createAndAttachElement(
            "p",
            { class: "plot" },
            ".book-selected",
            "beforeend",
            response
          );
        })
        .catch((error) => {
          bookDescription = "Book description not available";
          createAndAttachElement(
            "p",
            { class: "plot" },
            ".book-selected",
            "beforeend",
            bookDescription
          );
        });
      // exit loop in case of more than 1 same book title but different editions.
      break;
    }
  }
}

/// Handling of missing data for each book
// NOTE: sometimes authors are given back as an object, trending param = true in this case.
function bookDataHandler(book) {
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
        return book;
      })
      // image not found (error 403), create book with default cover
      .catch((error) => {
        book.customCoverLinkProp = cover_default;
        return book;
      })
  );
}

export { fetchDailyTrendingBooks, fetchBooksBySubject, fetchBookDescription };
