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
    .get("https://openlibrary.org/trending/daily.json")
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
        bookDataHandler(book, false).then(() => {
          console.log(book.author_name);
          createBook(
            book.title,
            book.author_name,
            booksContainer,
            book.cover_i
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
        bookDataHandler(book, true).then(() => {
          createBook(book.title, book.authors, booksContainer, book.cover_i);
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
function fetchBookDescription() {
  axios.get("https://openlibrary.org/works/OL45804W.json").then((res) => {
    const bookInfo = res.data;
    console.log("description", bookInfo.description);
  });
}

/// Handling of missing data for each book
// NOTE: sometimes authors are given back as an object, trending param = true in this case.
function bookDataHandler(book, subject) {
  return new Promise(function (resolve, reject) {
    if (!book.title) book.title = "Book title unavailable";

    let authorsList = book.authors ?? book.author_name;
    book.authorsList = authorsList;
    console.log(book);

    // authorsList = null;
    if (!authorsList) book.authorsList = "Book author unavailable";

    // work with book.authors [{}]
    // if (subject == true) {
    //   if (!book.authors) {
    //     book.authors = "Book author not available";
    //   } else {
    //     let authors = [];
    //     for (let author of book.authors) {
    //       authors.push(author.name);
    //       console.log(author.name);
    //       book.authors = authors;
    //       console.log("authors array", authors);
    //     }
    //   }
    // }

    // work with book.author_name []
    // if (subject == false) {
    //   if (!book.author_name) {
    //     book.author_name = "Book author not available";
    //   }
    // }

    // book cover
    if (!book.cover_i) {
      book.cover_i = cover_default;
      resolve(book);
    } else {
      console.log(book);
      fetchBookCover(book).then(() => {
        console.log(book);
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
        `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg?default=false`
      )
      .then((response) => {
        let coverLink;

        coverLink = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
        book.cover_i = coverLink;
        // return book;
      })
      // image not found (error 403), create book with default cover
      .catch((error) => {
        book.cover_i = cover_default;
      })
  );
}

export { fetchDailyTrendingBooks, fetchBooksBySubject, fetchBookDescription };
