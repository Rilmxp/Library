"use strict";

import axios from "axios";
import { createBook, createAndAttachElement } from "./page-creation";
import cover_default from "../assets/img/cover_default_small.jpg";

let booksContainer = document.querySelector(".books-container");
let loader = document.querySelector(".loader");
let booksLoaded = false;

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

// fetch books by subject

function fetchBooksBySubject() {
  axios
    .get("https://openlibrary.org/subjects/fantasy.json")
    .then((res) => {
      const books = res.data.works;

      console.log("Subject", books);
      console.log("title", books[0].title);
      console.log("work_key", books[0].key);
      console.log("cover_id", books[0].cover_id);

      books[0].authors.forEach((author) => console.log("authors", author.name));

      return books;
    })
    .then((books) => {});
}

function fetchBookDescription() {
  axios.get("https://openlibrary.org/works/OL45804W.json").then((res) => {
    const bookInfo = res.data;
    console.log("description", bookInfo.description);
  });
}

/// Handling of missing data for each book

function BookDataHandler(book) {
  if (!book.title) book.title = "Book title unavailable";
  if (!book.author_name) book.author_name = "Book author unavailable";
  if (!book.cover_i) book.cover_i = cover_default;

  return book;
}

export {
  fetchDailyTrendingBooks,
  fetchBooksBySubject,
  fetchBookDescription,
  booksLoaded,
};
