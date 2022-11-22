"use strict";

// CONTAINS ALL FUNCTIONS AND DATA HANDLING RELATED TO HTTP REQUESTS //

import axios from "axios";
import {
  createBook,
  createAndAttachElement,
  createLoader,
} from "./page-creation";
import cover_default from "../assets/img/cover_default_small.jpg";

import { heading, previousHeading, changeHeading } from "./index";
import _ from "lodash";

let booksContainer = document.querySelector(".books-container");
let activeBooks = [];

// fetch daily trending books.
function fetchDailyTrendingBooks() {
  // shows loader spinner
  // changeHeading("Searching for books...");
  // heading.style.visibility = "hidden";
  createLoader();

  axios
    .get("https://openlibrary.org/trending/daily.json")
    .then((res) => {
      const books = res.data.works;
      console.log("daily books", books);
      activeBooks = books;
      return books;
    })
    .then((books) => {
      //remove loader
      // heading.style.visibility = "visible";
      changeHeading("Today's trending books");
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
        // heading.style.visibility = "hidden";
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
  let activeBooksDisplayed = document.querySelectorAll(".book");

  // temporarily hide displayed books.
  activeBooksDisplayed.forEach((book) => (book.style.display = "none"));

  // hide error message, if present
  if (document.querySelector(".error-message")) {
    document.querySelector(".error-message").remove();
  }

  // heading.hidden = true;
  // heading.innerHTML = "";
  // heading.style.visibility = "hidden";
  heading.style.opacity = "0";
  createLoader();
  axios
    .get(`https://openlibrary.org/subjects/${subject}.json`)
    .then((res) => {
      const books = res.data.works;
      // console.log("wrong subject", res.data.works);
      // activeBooks = books;
      return books;
    })
    .then((books) => {
      createLoader(false);
      if (_.isEmpty(books)) {
        // heading.style.visibility = "hidden";
        createAndAttachElement(
          "div",
          { class: "error-message" },
          ".books-container",
          "afterbegin",
          "No books available with that subject. Please insert another subject"
        );

        new Promise(function (resolve, reject) {
          setTimeout(() => {
            resolve(
              (document.querySelector(".error-message").style.display = "none")
            );
          }, 3000);
        }).then(() => {
          // console.log("before", previousHeading);
          changeHeading();
          // console.log("after", previousHeading);
          activeBooksDisplayed.forEach((book) => (book.style.display = ""));
        });
      } else {
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
        // heading.style.visibility = "hidden";
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
// description is sent back either as a string or {value:description}
function fetchBookDescription() {
  let bookTitle = document.querySelector(
    ".book-selected .book-title"
  ).innerText;
  let bookDescription;

  // use book title to find book and its key to fetch description
  for (let activeBook of activeBooks) {
    // console.log(activeBook);
    if (activeBook.title === bookTitle) {
      console.log("activeBook", activeBook, activeBook.key, activeBook.title);

      axios
        .get(`https://openlibrary.org${activeBook.key}.json`)
        .then((response) => {
          console.log("data", response.data);
          console.log("description", response.data.description);
          // check for prop and value existence
          if (
            !bookDescription ||
            _isEmpty(bookDescription) ||
            _isEmpty(bookDescription.value)
          ) {
            bookDescription = "Book description not available";
          }

          // if string
          bookDescription = response.data.description;

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
      // exit loop in case of more than 1 same book title exists with different editions so description doesn't get duplicated.
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

export {
  fetchDailyTrendingBooks,
  fetchBooksBySubject,
  fetchBookDescription,
  activeBooks,
};
