"use strict";

// File contains all functions for fetching and data handling  of http requests

// imports of external libraries
import axios from "axios";
import { _isEmpty } from "lodash";

// imports of variables and functions
import {
  createBook,
  createErrorMessage,
  createLoader,
  createBookDescription,
} from "./page-creation";
import { booksContainer, heading } from "./index";
import {
  changeHeading,
  showPreviousBooks,
  bookDataHandler,
  measureTextLength,
} from "./helpers";

// stores books returned by http requests.
let activeBooks = [];

// true if a request returns no results, will be used in form validation.
let noBooks;

///// FETCH TRENDING BOOKS  /////
function fetchDailyTrendingBooks() {
  createLoader();

  axios
    .get("https://openlibrary.org/trending/daily.json")
    .then((res) => {
      const books = res.data.works;
      // process only half the books received (usually 100) to improve loading time.
      activeBooks = books.slice(0, books.length / 2);
      return activeBooks;
    })
    .then((books) => {
      //remove loader
      createLoader(false);

      changeHeading("Today's trending books");

      noBooks = false;

      books.forEach((book) => {
        // handle data receive to create book elements.
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
        noBooks = true;
        createLoader(false);
        createErrorMessage(
          "Books data currently unavailable. Please try again later or search for your own books with the form above"
        );
      }
    });
}

///// FETCH BOOKS BY SUBJECT   /////
function fetchBooksBySubject(subject) {
  let activeBooksDisplayed = document.querySelectorAll(".book");

  // temporarily hide displayed books. They will be shown again if the subject search returns no results. Otherwise they will be removed
  activeBooksDisplayed.forEach((book) => (book.style.display = "none"));

  // hide error message, if present from previous search
  if (document.querySelector(".error-message")) {
    document.querySelector(".error-message").remove();
  }

  heading.style.opacity = "0";
  createLoader();

  axios
    .get(`https://openlibrary.org/subjects/${subject}.json`)
    .then((res) => {
      const books = res.data.works;
      return books;
    })
    .then((books) => {
      createLoader(false);

      // if no books returned with that subject
      if (_.isEmpty(books)) {
        noBooks = true;
        createErrorMessage(
          "No books available with that subject. Please insert another subject"
        );
        // show back our hidden active books.
        showPreviousBooks(activeBooksDisplayed);
      } else {
        // otherwise update active books, remove the previously displayed ones and change heading.
        noBooks = false;
        activeBooks = books;
        activeBooksDisplayed.forEach((book) => book.remove());
        changeHeading(
          `${_.capitalize(subject).split("_").join(" ")} related books`
        );

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
      }
    })
    .catch((error) => {
      if (error.response || error.request) {
        noBooks = true;
        createLoader(false);
        createErrorMessage(
          "Books data currently unavailable. Please try again later"
        );
        showPreviousBooks(activeBooksDisplayed);
      }
    });
}

/////  FETCH BOOK DESCRIPTION     /////
// description is received either as a string or object {value:description}
// book.title will be used to match book.key of current active books to the one selected by the user

function fetchBookDescription() {
  let bookTitle = document.querySelector(
    ".book-selected .book-title"
  ).innerText;

  heading.style.opacity = "0";

  // use book title to find book and its key to fetch description
  for (let activeBook of activeBooks) {
    if (activeBook.title === bookTitle) {
      axios
        .get(`https://openlibrary.org${activeBook.key}.json`)
        .then((response) => {
          changeHeading();

          let bookDescription = response.data.description;

          // check for existence and string value
          if (!bookDescription || _.isEmpty(bookDescription)) {
            bookDescription = "Book description not available";
          }

          // if {}
          if (typeof bookDescription === "object") {
            if (_.isEmpty(bookDescription.value)) {
              bookDescription = "Book description not available";
            } else {
              bookDescription = bookDescription.value;
            }
          }

          return bookDescription;
        })
        .then((description) => {
          createBookDescription(description);
        })
        .catch((error) => {
          createBookDescription("Book description not available");
        })
        .finally(() => {
          // if text description too short text-align center instead of left
          measureTextLength();
        });
      // exit loop in case of more than 1 same book title exists with different editions so description doesn't get duplicated.
      break;
    }
  }
}

/////  FETCH BOOK COVER   /////
function fetchBookCover(book) {
  return (
    axios
      .get(
        `https://covers.openlibrary.org/b/id/${book.customCoverLinkProp}-L.jpg?default=false`
      )
      .then((response) => {
        // if successful response
        if (response.status == 200) {
          book.customCoverLinkProp = `https://covers.openlibrary.org/b/id/${book.customCoverLinkProp}-L.jpg`;
          return book;
        }
      })
      // image not found create book with cover_default
      .catch((error) => {
        return book;
      })
  );
}

export {
  fetchDailyTrendingBooks,
  fetchBooksBySubject,
  fetchBookDescription,
  fetchBookCover,
  activeBooks,
  noBooks,
};
