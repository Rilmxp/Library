"use strict";

// CONTAINS ALL FUNCTIONS AND DATA HANDLING RELATED TO HTTP REQUESTS //

import axios from "axios";
import {
  createBook,
  createAndAttachElement,
  createLoader,
} from "./page-creation";
import cover_default from "../assets/img/cover_default_small.jpg";

let booksContainer = document.querySelector(".books-container");
let activeBooks;

// fetch daily trending books.
function fetchDailyTrendingBooks() {
  // shows loader spinner
  createLoader();

  axios
    .get("https://openlibrary.org/trending/daily.json")
    .then((res) => {
      const books = res.data.works;
      activeBooks = books;
      return books;
    })
    .then((books) => {
      //remove loader
      createLoader(false);

      books.forEach((book) => {
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
        createLoader(false);
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
function fetchBooksBySubject(subject) {
  // console.log(activeBooks);
  let activeBooksDisplayed = document.querySelectorAll(".book");
  // console.log("activeBooksDisplayed", activeBooksDisplayed);
  // activeBooksDisplayed.forEach((book) => (book.style.display = "none"));
  activeBooksDisplayed.forEach((book) => book.remove());

  createLoader();

  axios
    .get(`https://openlibrary.org/subjects/${subject}.json`)
    .then((res) => {
      const books = res.data.works;
      activeBooks = books;
      return books;
    })
    .then((books) => {
      createLoader(false);

      // activeBooksDisplayed.forEach((book) => book.remove());

      books.forEach((book) => {
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
        createLoader(false);
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
// description is sent back either as [] or {}
function fetchBookDescription() {
  let bookTitle = document.querySelector(
    ".book-selected .book-title"
  ).innerText;
  let bookDescription;

  // use book title to find book and its key to fetch description
  for (let activeBook of activeBooks) {
    if (activeBook.title === bookTitle) {
      console.log("activeBook", activeBook.key, activeBook.title);

      axios
        .get(`https://openlibrary.org${activeBook.key}.json`)
        .then((response) => {
          // if []
          bookDescription = response.data.description;

          if (!bookDescription) {
            bookDescription = "Book description not available";
          }

          // if {}
          if (typeof bookDescription !== "string") {
            bookDescription = bookDescription.value;
          }

          return bookDescription;
        })
        .then((response) => {
          createAndAttachElement(
            "p",
            { class: "book-description" },
            ".book-selected",
            "beforeend",
            response
          );
        })
        .catch((error) => {
          bookDescription = "Book description not available";
          createAndAttachElement(
            "p",
            { class: "book-description" },
            ".book-selected",
            "beforeend",
            bookDescription
          );
        });
      // exit loop in case of more than 1 same book title exists with different editions.
      break;
    }
  }
}

/// Handling of missing data for each book
// NOTE: Some APIs send authors back as an array of objects ("authors") or as an simiple array ("author_name"). Covers either as "cover_i" or "cover_id". "customAuthorsProp" and "customCoverLinkProp" have been created and added to objects to ease the handling of data.
function bookDataHandler(book) {
  return new Promise(function (resolve, reject) {
    // TITLE //
    if (!book.title) book.title = "Book title not available";

    // AUTHORS //
    let customAuthorsProp = book.authors ?? book.author_name;
    book.customAuthorsProp = customAuthorsProp;

    if (!book.customAuthorsProp)
      book.customAuthorsProp = "Book author not available";

    // if array of objects
    if (book.authors) {
      for (let i = 0; i < book.authors.length; i++) {
        customAuthorsProp[i] = book.authors[i].name;
      }
    }

    // add space after each comma.
    if (
      Array.isArray(book.customAuthorsProp) &&
      book.customAuthorsProp.length > 1
    ) {
      book.customAuthorsProp = book.customAuthorsProp.join(", ");
    }

    // COVER //
    let customCoverLinkProp = book.cover_id ?? book.cover_i;
    book.customCoverLinkProp = customCoverLinkProp;

    // set cover_default if cover doesn't exist
    if (!book.customCoverLinkProp) {
      book.customCoverLinkProp = cover_default;
      resolve(book);
    } else {
      fetchBookCover(book).then(() => {
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
        book.customCoverLinkProp = `https://covers.openlibrary.org/b/id/${book.customCoverLinkProp}-L.jpg`;
        // book.customCoverLinkProp = coverLink;
        return book;
      })
      // image not found create book with default cover
      .catch((error) => {
        book.customCoverLinkProp = cover_default;
        return book;
      })
  );
}

export { fetchDailyTrendingBooks, fetchBooksBySubject, fetchBookDescription };
