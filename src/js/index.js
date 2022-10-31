import * as bootstrap from "bootstrap";
import "../assets/fontawesome/css/fontawesome.css";
import "../assets/fontawesome/css/brands.css";
import "../assets/fontawesome/css/solid.css";
import "../styles/sass/styles.scss";
import goldfinch from "../assets/img/goldfinch.jpg";
import friend from "../assets/img/friend.jpg";
import history from "../assets/img/history.jpg";

// javascript imports
import createAndAttachElement from "./pageCreation.js";

import bookshelf from "../assets/img/bookshelf.jpg";

console.log(bookshelf);
const pic1 = document.querySelector(".book-cover img");
const pic2 = document.querySelector("#friend");
const pic3 = document.querySelector("#history");
// console.log(bookshelfPic);
pic1.src = goldfinch;
pic2.src = friend;
pic3.src = history;

// to place viewer at the center of books.
window.onload = function () {
  let aboutUs = document.querySelector("#book2");
  aboutUs.scrollIntoView({
    block: "center",
    inline: "center",
    behavior: "auto",
  });
};

// Move element on click

let headline = document.querySelector(".trending");

let selectedBook = document.querySelector("#book2");
selectedBook.classList.add("selected-book");
console.log(selectedBook);

let searchboxBooksContainer = document.querySelector(
  ".searchbox-books-container"
);
let booksContainer = document.querySelector(".books-container");

let books = document.querySelectorAll(".book");
console.log(books);

selectedBook.addEventListener("click", function () {
  books.forEach((book) => {
    if (!book.classList.contains("selected-book")) book.style.display = "none";
  });
  headline.innerHTML = "Your choice:";
  const lorem =
    "The Little Friend Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique reiciendis quo beatae ad fuga. Officiis, doloremque, quasi perspiciatis atque dolor explicabo nostrum aperiam eius vero pariatur molestias? Quos, provident beatae!";
  createAndAttachElement("p", {}, "#book2", "afterend", lorem);
  booksContainer.className = "books-container-selected";
  selectedBook.className = "book-selected";
  searchboxBooksContainer.className = "searchbox-books-container-selected";
});

/*

// H1 Title
createAndAttachElement("h1", {}, "body", "beforeend", "Library");

// Searchbox
createAndAttachElement(
  "input",
  {
    class: "form-control form-control-lg",
    type: "text",
    placeholder: "Book subject",
    "aria-label": "Book subject",
  },
  "body",
  "beforeend",
  ""
);

// Footer
createAndAttachElement(
  "footer",
  {
    style: "background-color: beige",
  },
  "body",
  "beforeend",
  "This is the footer"
);

*/
