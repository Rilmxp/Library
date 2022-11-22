"use strict";

// imports
import { containerObserver } from "./index";
import { activeBooks, fetchBooksBySubject } from "./http-requests";

// variables
let formSearchSubject = document.querySelector("form");
let inputSearchSubject = document.querySelector("#input-search-subject");
let booksContainer = document.querySelector(".books-container");

// submit form eventListener
function formSubmission() {
  formSearchSubject.addEventListener("submit", function (e) {
    e.preventDefault();
    formSearchSubject.classList.add("was-validated");

    // format string for attaching to url (eg, "history_of_art")
    let subject = inputSearchSubject.value.toLowerCase().split(" ").join("_");

    // check validity of input
    checkInputField(subject);

    // if invalid
    if (!inputSearchSubject.checkValidity()) {
      //remove format after 3s
      setTimeout(() => {
        formSearchSubject.classList.remove("was-validated");
      }, 3000);
      return;
    }

    // if "book description" was open
    if (booksContainer.classList.contains("books-container-selected")) {
      containerObserver.disconnect();
      booksContainer.classList.remove("books-container-selected");
      document
        .querySelector(".book-selected")
        .classList.remove("book-selected");
    }

    // proceed to fetch books as per valid input
    fetchBooksBySubject(subject);
  });
}

// Custom validation for the input field.
// Params: string (user's input).

function checkInputField(subject) {
  let invalidFeedback = document.querySelector(".invalid-feedback");
  let booksLength = document.querySelectorAll(".book").length;

  // check all current book elems have been created.
  let booksLoaded =
    activeBooks.length === booksLength && activeBooks.length !== 0;

  // check input field not empty and all books created. Otherwise cannot submit
  if (!subject) {
    inputSearchSubject.setCustomValidity("Please, enter a book subject");
    invalidFeedback.innerHTML = "Please, enter a book subject";
    return;
  } else if (!booksLoaded) {
    inputSearchSubject.setCustomValidity("Current books still loading");
    invalidFeedback.innerHTML = "Current books still loading";
    return;
  } else {
    inputSearchSubject.setCustomValidity("");
  }
}

export { formSubmission };
