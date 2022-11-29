"use strict";

import { heading } from "./index";

let previousHeading;

// func mutationObserver creates an observer for .books-container
//when books are still being loaded and user clicks on any book, it prevents the display of future books in the container. So inside the ".book-container-selected" only one book will be shown (the one selected by the user).

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

// func changeHeading changes the heading above the book container to indicate user what book selection he is looking at.
// params: text = "string" with name of heading.

function changeHeading(text) {
  // remember last sucessful heading to show again (with same previous books) in case of an unsuccessful subject search.
  if (text) previousHeading = text;

  if (!text) text = "Your book of choice";

  heading.innerHTML = text;

  if (heading.style.opacity === "1") {
    heading.style.opacity = "0";
  } else {
    heading.style.opacity = "1";
  }
}

function showPreviousBooks(previousBooks) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(
        (document.querySelector(".error-message").style.display = "none")
      );
    }, 3000);
  }).then(() => {
    changeHeading(previousHeading);
    previousBooks.forEach((book) => (book.style.display = ""));
  });
}

export { mutationObserver, changeHeading, previousHeading, showPreviousBooks };
