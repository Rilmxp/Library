// import * as bootstrap from "bootstrap";

// font awesome imports
import "../assets/fontawesome/css/fontawesome.css";
import "../assets/fontawesome/css/brands.css";
import "../assets/fontawesome/css/solid.css";
import "../styles/sass/styles.scss";

// variables.
import { booksLoaded } from "./http-requests";

// pics imports
// import cover_default from "../assets/img/cover_default.jpg";
// import goldfinch from "../assets/img/goldfinch.jpg";
// import friend from "../assets/img/friend.jpg";
// import history from "../assets/img/history.jpg";

// javascript imports
import { createAndAttachElement, createBook } from "./page-creation.js";
import { trendingBooks } from "./http-requests";

let booksContainer = document.querySelector(".books-container");

trendingBooks();
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

booksContainer.addEventListener("click", function (event) {
  // console.log("inside click", booksLoaded);
  // console.log("book count", document.querySelectorAll(".book").length);
  // if (booksLoaded == false) return;
  // if (document.querySelectorAll(".book").length < 50) return;

  let target = event.target.closest(".book");

  //////////////////////////
  //OBSERVER
  const bookList = document.querySelectorAll(".book");
  console.log(bookList);
  const options = {};

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      console.log(entry.target);
    });
  }, options);

  observer.observe(bookList[0]);
  //////////////////////////

  console.log(target);

  if (!target) return;

  let books = document.querySelectorAll(".book");
  target.classList.toggle("selected");

  if (target.classList.contains("selected")) {
    // hide all other books
    books.forEach((book) => {
      if (!book.classList.contains("selected")) {
        // book.classList.add("fade-out");
        book.style.display = "none";
      }
    });

    // add book description
    const lorem =
      "The Little Friend Lorem ipsum dolor sit amet consectetur adipisicing elit.";
    createAndAttachElement(
      "p",
      { class: "plot" },
      ".selected",
      "afterend",
      lorem
    );

    // change layout of containers
    booksContainer.className = "books-container-selected";
    // booksContainer.style.maxHeight = "436px";
    searchboxBooksContainer.style.cssText = "min-height: 80vh";

    // change header
    changeHeading(headline, "Your book of choice");
    // headline.innerHTML = "Your book of choice";
  } else {
    // show all books again
    books.forEach((book) => {
      // book.style.opacity = "1";
      book.style.display = "";
    });

    // change back containers layout
    booksContainer.className = "books-container";
    searchboxBooksContainer.style.cssText = "height: 80vh";
    // headline.style.animation = "fade 1s ease";
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
