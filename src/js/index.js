// import * as bootstrap from "bootstrap";

// font awesome imports
import "../assets/fontawesome/css/fontawesome.css";
import "../assets/fontawesome/css/brands.css";
import "../assets/fontawesome/css/solid.css";
import "../styles/sass/styles.scss";

// pics imports
import cover_default from "../assets/img/cover_default.jpg";
// import goldfinch from "../assets/img/goldfinch.jpg";
import friend from "../assets/img/friend.jpg";
import history from "../assets/img/history.jpg";

// javascript imports
import { createAndAttachElement, createBook } from "./page-creation.js";
import { trendingBooks } from "./http-requests";

let booksContainer = document.querySelector(".books-container");

// trendingBooks();
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
const pic1 = document.querySelector(".book-cover img");
const pic2 = document.querySelector("#friend");
const pic3 = document.querySelector("#history");
// console.log(bookshelfPic);
pic1.src = cover_default;
// pic2.src = friend;
pic3.src = history;

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

let selectedBook = document.querySelector("#book2");
selectedBook.classList.add("selected-book");
// console.log(selectedBook);

let searchboxBooksContainer = document.querySelector(
  ".searchbox-books-container"
);

let books = document.querySelectorAll(".book");
// console.log(books);

selectedBook.addEventListener("click", function () {
  books.forEach((book) => {
    if (!book.classList.contains("selected-book")) book.style.display = "none";
  });
  headline.innerHTML = "<p>Your book of choice:</p>";
  const lorem =
    "The Little Friend Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique reiciendis quo beatae ad fuga. Officiis, doloremque, quasi perspiciatis atque dolor explicabo nostrum aperiam eius vero pariatur molestias? Quos, provident beatae! The Little Friend Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique reiciendis quo beatae ad fuga. Officiis, doloremque, quasi perspiciatis atque dolor explicabo nostrum aperiam eius vero pariatur molestias? Quos, provident beatae!";
  createAndAttachElement("p", { class: "plot" }, "#book2", "afterend", lorem);
  booksContainer.className = "books-container-selected";
  selectedBook.className = "book-selected";
  searchboxBooksContainer.style.cssText = "min-height: 80vh";

  // searchboxBooksContainer.className = "searchbox-books-container-selected";
});

booksContainer.addEventListener("click", function (event) {
  let target = event.target.closest(".book");

  if (!target) return;

  let books = document.querySelectorAll(".book");
  target.classList.add(".selected");

  books.forEach((book) => {
    if (!book.classList.contains("selected")) book.style.display = "none";
  });

  const lorem =
    "The Little Friend Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique reiciendis quo beatae ad fuga. Officiis, doloremque, quasi perspiciatis atque dolor explicabo nostrum aperiam eius vero pariatur molestias? Quos, provident beatae! The Little Friend Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique reiciendis quo beatae ad fuga. Officiis, doloremque, quasi perspiciatis atque dolor explicabo nostrum aperiam eius vero pariatur molestias? Quos, provident beatae!";
  createAndAttachElement(
    "p",
    { class: "plot" },
    ".selected",
    "afterend",
    lorem
  );

  // console.log(event.target.closest(".book"));
  booksContainer.className = "books-container-selected";
  // target.style.height = "";
  searchboxBooksContainer.style.cssText = "min-height: 80vh";
});
