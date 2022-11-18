// import * as bootstrap from "bootstrap";

// font awesome imports
import "../assets/fontawesome/css/fontawesome.css";
import "../assets/fontawesome/css/brands.css";
import "../assets/fontawesome/css/solid.css";
import "../styles/sass/styles.scss";

// variables.

// pics imports
// import cover_default from "../assets/img/cover_default_small.jpg";
// import bookshelf from "../assets/img/bookshelf.jpg";

// javascript imports
import { createAndAttachElement, createBook } from "./page-creation.js";
import {
  fetchDailyTrendingBooks,
  fetchBooksBySubject,
  fetchBookDescription,
} from "./http-requests";
import axios from "axios";

let booksContainer = document.querySelector(".books-container");

let buttonSearchSubject = document.querySelector("#button-search-subject");
let inputSearchSubject = document.querySelector("#input-search-subject");
let formSearchSubject = document.querySelector("form");

// Necessary for Bootstrap validation styles
(() => {
  formSearchSubject.addEventListener(
    "submit",
    (event) => {
      if (!formSearchSubject.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      formSearchSubject.classList.add("was-validated");
    },
    false
  );
})();

// get book subjects search box
formSearchSubject.addEventListener("submit", function (e) {
  const subject = inputSearchSubject.value;
  console.log(inputSearchSubject.value);

  // if (subject == "a") formSearchSubject.classList.add();
  e.preventDefault();
  // e.stopPropagation();

  fetchBooksBySubject(subject);
});

fetchDailyTrendingBooks();
// fetchBooksBySubject();
// fetchBookDescription();

// click on book, shows book description and changes layout
booksContainer.addEventListener("click", function (event) {
  let target = event.target.closest(".book");
  if (!target) return;

  //when user clicks on books, and not all of these have been yet created, it prevents the display of future books. So inside the ".book-container-selected" only one book will be shown.
  mutationObserver().observe(booksContainer, { childList: true });

  let books = document.querySelectorAll(".book");

  target.classList.toggle("book-selected");

  if (target.classList.contains("book-selected")) {
    //fetch book description
    fetchBookDescription();

    // hide all other books
    books.forEach((book) => {
      if (!book.classList.contains("book-selected")) {
        book.style.display = "none";
      }
    });

    // change layout of container
    booksContainer.classList.toggle("books-container-selected");
  } else {
    // show all books again
    books.forEach((book) => {
      book.style.display = "";
    });

    // change back container layout
    booksContainer.classList.toggle("books-container-selected");

    // remove book description
    document.querySelector(".book-description").remove();

    // place viewer at selected book original position
    goBackToBook();

    // places viewer at same book position
    function goBackToBook() {
      target.scrollIntoView({
        block: "center",
        inline: "center",
        behavior: "auto",
      });
    }
  }

  function mutationObserver() {
    return new MutationObserver((mutations) => {
      for (let mutation of mutations) {
        for (let node of mutation.addedNodes) {
          if (node instanceof HTMLElement) {
            node.style.display = "none";
          }
        }
      }
    });
  }

  // function changeHeading(heading, text) {
  //   heading.classList.add("fade-out");
  //   heading.addEventListener("animationend", () => (heading.innerHTML = text));
  //   heading.classList.remove("fade-out");
  //   heading.classList.add("fade-in");
  // }
});

export { booksContainer };
