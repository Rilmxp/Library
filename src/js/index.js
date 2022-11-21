// import * as bootstrap from "bootstrap";

// font awesome imports
import "../assets/fontawesome/css/fontawesome.css";
import "../assets/fontawesome/css/brands.css";
import "../assets/fontawesome/css/solid.css";
import "../styles/sass/styles.scss";

import _ from "lodash";

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
  activeBooks,
} from "./http-requests";
// import axios from "axios";

// // test lodash
// let testArray = { type: "richard", value: "" };
// let testArray2 = "";

// console.log("loadash", _.isEmpty(testArray.value));
// console.log("loadash", _.isEmpty(testArray2));

let booksContainer = document.querySelector(".books-container");
let containerObserver = mutationObserver();

let buttonSearchSubject = document.querySelector("#button-search-subject");
let inputSearchSubject = document.querySelector("#input-search-subject");
let formSearchSubject = document.querySelector("form");

let heading = document.querySelector(".books-display-header");
let previousHeading;

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
  e.preventDefault();

  // console.log(
  //   "activeBooks",
  //   activeBooks.length,
  //   ".books",
  //   document.querySelectorAll(".book").length
  // );

  // wait to submit until all books have been loaded
  let booksNotLoaded =
    document.querySelectorAll(".book").length < activeBooks.length;

  // format string to submit to api through url (eg, history_of_art)
  let subject = inputSearchSubject.value.toLowerCase().split(" ").join("_");

  if (!subject || booksNotLoaded) {
    // empty string error message below input box
    console.log(booksNotLoaded);
    let invalidFeedback = document.querySelector(".invalid-feedback");

    // if (!subject) invalidFeedback.innerHTML = "Please, enter a book subject";
    if (!subject) {
      inputSearchSubject.setCustomValidity("Please, enter a book subject");
    }
    // if (booksNotLoaded)
    //   invalidFeedback.innerHTML =
    //     "Current books not yet loaded. Please, try again later.";

    if (booksNotLoaded)
      inputSearchSubject.setCustomValidity(
        "Current books not yet loaded. Please, try again later."
      );

    inputSearchSubject.reportValidity();

    setTimeout(() => {
      formSearchSubject.classList.remove("was-validated");
    }, 2000);

    return;
  }
  // console.log(subject, typeof subject);
  // console.log(subject.split(" ").join("_"));

  // cosole.log(subject.toLowerCase());
  // console.log(subject);

  if (booksContainer.classList.contains("books-container-selected")) {
    containerObserver.disconnect();
    booksContainer.classList.remove("books-container-selected");
    document.querySelector(".book-selected").classList.remove("book-selected");
  }

  // if (subject == "a") formSearchSubject.classList.add();
  // e.preventDefault();
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
  // mutationObserver().observe(booksContainer, { childList: true });
  // let containerObserver = mutationObserver();
  // containerObserver.observe(booksContainer, { childList: true });

  let books = document.querySelectorAll(".book");

  target.classList.toggle("book-selected");
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

    // change heading
    heading.style.opacity = "0";
    setTimeout(() => {
      changeHeading("Your book of choice");
    }, 500);

    // changeHeading("Your book of choice");
  } else {
    // console.log("books else", books);
    containerObserver.disconnect();

    // show all books again
    books.forEach((book) => {
      book.style.display = "";
    });

    // change back container layout
    // booksContainer.classList.toggle("books-container-selected");

    // change heading
    heading.style.opacity = "0";
    setTimeout(() => {
      changeHeading(previousHeading);
    }, 500);

    //;

    // remove book description
    // document.querySelector(".book-description").remove();
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

  // function mutationObserver() {
  //   return new MutationObserver((mutations) => {
  //     for (let mutation of mutations) {
  //       for (let node of mutation.addedNodes) {
  //         if (node instanceof HTMLElement) {
  //           node.style.display = "none";
  //         }
  //       }
  //     }
  //   });
  // }

  // function changeHeading(heading, text) {
  //   heading.classList.add("fade-out");
  //   heading.addEventListener("animationend", () => (heading.innerHTML = text));
  //   heading.classList.remove("fade-out");
  //   heading.classList.add("fade-in");
  // }
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

function changeHeading(text) {
  previousHeading = heading.innerHTML;
  if (!text) text = previousHeading;

  heading.innerHTML = text;

  if (heading.style.opacity === "1") {
    heading.style.opacity = "0";
  } else {
    heading.style.opacity = "1";
  }
  // heading.style.visibility = "visible";
  // heading.style.opacity = "0";
  // heading.addEventListener("transitionend", () => {
  //   if (heading.style.opacity === "1") {
  //     heading.style.opacity = "0";
  //   } else {
  //     heading.style.opacity = "1";
  //   }
  // });

  // heading.innerHTML = text;
  // heading.style.opacity = "1";
}

export { booksContainer, changeHeading, heading, previousHeading };
