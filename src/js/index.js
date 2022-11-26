// import * as bootstrap from "bootstrap";

// font awesome imports
import "../assets/fontawesome/css/fontawesome.css";
import "../assets/fontawesome/css/brands.css";
import "../assets/fontawesome/css/solid.css";
import "../styles/sass/styles.scss";

import _ from "lodash";

// variables.

// pics imports
import favicon from "../assets/img/favicon.png";
const faviconHtml = document.querySelector("link[rel~='icon']");
faviconHtml.href = favicon;

// javascript imports
import { createAndAttachElement, createBook } from "./page-creation.js";
import {
  fetchDailyTrendingBooks,
  fetchBooksBySubject,
  fetchBookDescription,
  activeBooks,
} from "./http-requests";
import { formSubmission } from "./form-submission";
// import axios from "axios";

let booksContainer = document.querySelector(".books-container");
let containerObserver = mutationObserver();
let heading = document.querySelector(".books-display-header");
let previousHeading;

// Creates event listener on form for submitting book subject
formSubmission();

// shows all trending books at page load.
fetchDailyTrendingBooks();

// click on book, shows book description and changes layout
booksContainer.addEventListener("click", function (event) {
  let target = event.target.closest(".book");
  if (!target) return;

  //when user clicks on books, and not all of these have been yet created, it prevents the display of future books. So inside the ".book-container-selected" only one book will be shown.
  // mutationObserver().observe(booksContainer, { childList: true });
  // let containerObserver = mutationObserver();
  // containerObserver.observe(booksContainer, { childList: true });

  let books = document.querySelectorAll(".book");

  target.classList.toggle("book-selected");
  target.classList.toggle("no-hover");
  booksContainer.classList.toggle("books-container-selected");

  if (target.classList.contains("book-selected")) {
    containerObserver.observe(booksContainer, { childList: true });

    //fetch book description
    fetchBookDescription();

    // heading.style.opacity = "0";

    // hide all other books
    books.forEach((book) => {
      if (!book.classList.contains("book-selected")) {
        book.style.display = "none";
      }
    });
  } else {
    // console.log("books else", books);
    containerObserver.disconnect();

    // show all books again
    books.forEach((book) => {
      book.style.display = "";
    });

    // change heading
    heading.style.opacity = "0";
    setTimeout(() => {
      changeHeading(previousHeading);
    }, 500);

    //;

    // remove book description
    if (document.querySelector(".book-description")) {
      document.querySelector(".book-description").remove();
    }

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
});

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

//
function changeHeading(text) {
  // remember last sucessful heading to show again in case of a failed subject search.
  if (text) previousHeading = text;

  if (!text) text = "Your book of choice";

  heading.innerHTML = text;

  if (heading.style.opacity === "1") {
    heading.style.opacity = "0";
  } else {
    heading.style.opacity = "1";
  }
}

export {
  booksContainer,
  changeHeading,
  heading,
  previousHeading,
  containerObserver,
};
