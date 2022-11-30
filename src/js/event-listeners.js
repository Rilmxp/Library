"use strict";

// file contains only event-listeners for <form> and .books-container

// imports
import { containerObserver, booksContainer, heading } from "./index";
import {
  activeBooks,
  fetchBooksBySubject,
  noBooks,
  fetchBookDescription,
} from "./http-requests";
import { changeHeading, previousHeading } from "./helpers";

// form SubmissionListner() Creates listener for form to trigger upon submission.

function formSubmissionListener() {
  const formSearchSubject = document.querySelector("form");
  const inputSearchSubject = document.querySelector("#input-search-subject");

  formSearchSubject.addEventListener("submit", function (e) {
    e.preventDefault();
    formSearchSubject.classList.add("was-validated");
    document
      .querySelector("#button-search-subject")
      .setAttribute("disabled", true);

    // format string for attaching to url (eg, "history_of_art")
    let subject = inputSearchSubject.value.toLowerCase().split(" ").join("_");

    // check validity of input
    checkInputField(subject);

    // if invalid
    if (!inputSearchSubject.checkValidity()) {
      //remove red feedback styles after 3s
      setTimeout(() => {
        formSearchSubject.classList.remove("was-validated");
        document
          .querySelector("#button-search-subject")
          .removeAttribute("disabled");
      }, 3000);
      return;
    }

    // if "book description" was open
    if (booksContainer.classList.contains("books-container-selected")) {
      // disconnect observer so new results will be displayed
      containerObserver.disconnect();
      booksContainer.classList.remove("books-container-selected");
      document
        .querySelector(".book-selected")
        .classList.remove("book-selected");
    }

    // proceed to fetch books as per valid input
    fetchBooksBySubject(subject);

    setTimeout(() => {
      document
        .querySelector("#button-search-subject")
        .removeAttribute("disabled");
    }, 3000);

    // INNER FUNCTIONS
    // func checkInputField provides custom validation for the input field.
    // Params: string (user's input, that is, a "book subject").
    function checkInputField(subject) {
      let invalidFeedback = document.querySelector(".invalid-feedback");
      let booksLength = document.querySelectorAll(".book").length;

      // check all current book elems have been loaded.
      let booksLoaded = false;
      if (
        noBooks ||
        (activeBooks.length === booksLength && activeBooks.length !== 0)
      ) {
        booksLoaded = true;
      }

      // check input field not empty and all books created. Otherwise cannot submit
      if (!subject) {
        inputSearchSubject.setCustomValidity("Please, enter a book subject");
        invalidFeedback.innerHTML = "Please, enter a book subject";
        return;
      }
      if (!booksLoaded) {
        inputSearchSubject.setCustomValidity("Current books still loading");
        invalidFeedback.innerHTML = "Books still loading. Try again later";
        return;
      }
      // valid input
      inputSearchSubject.setCustomValidity("");
    }
  });
}

// createBookContainerListener creates a listener on .book-container so when user clicks on a book, book description will be shown and .book-container layout will change

function BookContainerListener() {
  booksContainer.addEventListener("click", function (event) {
    let target = event.target.closest(".book");
    if (!target) return;

    let books = document.querySelectorAll(".book");

    // change layout and styles of booksContainer
    target.classList.toggle("book-selected");
    target.classList.toggle("no-hover");
    booksContainer.classList.toggle("books-container-selected");

    // if user has selected a book
    if (target.classList.contains("book-selected")) {
      // activate observer to prevent future books (those not yet loaded) to be displayed inside the container so you can only see the books selected.
      containerObserver.observe(booksContainer, { childList: true });

      //fetch book description
      fetchBookDescription();

      // hide all other books
      books.forEach((book) => {
        if (!book.classList.contains("book-selected")) {
          book.style.display = "none";
        }
      });
    }

    // if user has deselected a book
    if (!target.classList.contains("book-selected")) {
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

      // remove book description
      if (document.querySelector(".book-description")) {
        document.querySelector(".book-description").remove();
      }

      // place viewer at selected book original position
      target.scrollIntoView({
        block: "center",
        inline: "center",
        behavior: "auto",
      });
    }
  });
}

export { formSubmissionListener, BookContainerListener };
