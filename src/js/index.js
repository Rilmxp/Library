// import * as bootstrap from "bootstrap";

// font awesome imports
import "../assets/fontawesome/css/fontawesome.css";
import "../assets/fontawesome/css/brands.css";
import "../assets/fontawesome/css/solid.css";
import "../styles/sass/styles.scss";

// variables.

// pics imports
// import cover_default from "../assets/img/cover_default_small.jpg";

// javascript imports
import { createAndAttachElement, createBook } from "./page-creation.js";
import {
  fetchDailyTrendingBooks,
  fetchBooksBySubject,
  fetchBookDescription,
} from "./http-requests";

let booksContainer = document.querySelector(".books-container");

console.log(process.env.test);
// fetchDailyTrendingBooks();
fetchBooksBySubject();
// fetchBookDescription();
// const trendingBooksList = trendingBooks();

// for (const book in trendingBooksList) {
//   console.log(book.title, book.author_id, book.cover_i);
//   createBook(book.title, book.author_name, book.cover_i);
// }
// trendingBooksList.forEach(book => {
//   createBook(trending)
// }

// createBook("My Book", "richard Lucas", 1245, booksContainer);

import bookshelf from "../assets/img/bookshelf.jpg";

// console.log(bookshelf);
// const coverDefault = cover_default;
// const pic1 = document.querySelector(".book-cover img");
// const pic2 = document.querySelector("#friend");
// const pic3 = document.querySelector("#history");
// console.log(bookshelfPic);
// pic1.src = cover_default;
// pic2.src = friend;
// pic3.src = history;

// to place viewer at the center of books.
// window.onload = function () {
//   let aboutUs = document.querySelector("#book2");
//   aboutUs.scrollIntoView({
//     block: "center",
//     inline: "center",
//     behavior: "auto",
//   });
// };

// Move element on click

let headline = document.querySelector(".trending");

let searchboxBooksContainer = document.querySelector(
  ".searchbox-books-container"
);

// click on book, shows book description and changes layout
booksContainer.addEventListener("click", function (event) {
  // console.log("inside click", booksLoaded);
  console.log("book count", document.querySelectorAll(".book").length);

  let target = event.target.closest(".book");

  ///////////////////////////
  /// MUTATION OBSERVER

  const mutationObserver = new MutationObserver((mutations) => {
    console.log(mutations);
    for (let mutation of mutations) {
      // console.log("mutation", mutation);

      for (let node of mutation.addedNodes) {
        console.log(node);
        if (node instanceof HTMLElement) {
          // console.log("HTML ELEM", node);
          node.style.display = "none";
        }
      }
    }
  });

  mutationObserver.observe(booksContainer, { childList: true });

  ///////////////////////////

  console.log("target", target);

  if (!target) return;

  let books = document.querySelectorAll(".book");
  target.classList.toggle("book-selected");

  let bookSelected = document.querySelector(".book-selected");
  console.log("bookSelected", bookSelected);

  // if (bookSelected) {
  //   fetchBookDescription(target);
  // }

  if (target.classList.contains("book-selected")) {
    //fetch book description
    fetchBookDescription();

    // hide all other books
    books.forEach((book) => {
      if (!book.classList.contains("book-selected")) {
        book.style.display = "none";
      }
    });

    // change layout of containers
    booksContainer.className = "books-container-selected";
    searchboxBooksContainer.style.cssText = "min-height: 80vh";

    // change header
    changeHeading(headline, "Your book of choice");
  } else {
    // show all books again
    books.forEach((book) => {
      book.style.display = "";
    });

    // change back containers layout
    booksContainer.className = "books-container snap";
    searchboxBooksContainer.style.cssText = "height: 80vh";
    headline.innerHTML = "Trending today...";

    // remove book description
    document.querySelector(".plot").remove();

    // place viewer at same book position
    goToBook();

    // place view at same book position
    function goToBook() {
      target.scrollIntoView({
        block: "center",
        inline: "center",
        behavior: "auto",
      });
    }
  }

  function changeHeading(heading, text) {
    heading.classList.add("fade-out");
    heading.addEventListener("animationend", () => (heading.innerHTML = text));
    heading.classList.remove("fade-out");
    heading.classList.add("fade-in");
  }
});

export { booksContainer };
