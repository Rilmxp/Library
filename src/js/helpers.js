"use strict";

import { heading } from "./index";
import { fetchBookCover } from "./http-requests";
import { createAndAttachElement } from "./page-creation";
import { _isEmpty } from "lodash";

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

// func showPreviousBooks displays back books that had been temporarily hidden. It's called after a subject search with no results.

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

/// func bookDataHandler() Handles the missing data for each book
// NOTE: Some APIs send authors back as an array of objects ("authors") or as an simple array ("author_name"). Covers either as "cover_i" or "cover_id". "customAuthorsProp" and "customCoverLinkProp" have been created and added to objects to ease the handling of data.
function bookDataHandler(book) {
  return new Promise(function (resolve) {
    /// title ///
    if (!book.title || _.isEmpty(book.title))
      book.title = "Book title not available";

    /// authors ///
    let customAuthorsProp = book.authors ?? book.author_name;
    book.customAuthorsProp = customAuthorsProp;

    if (!book.customAuthorsProp || _.isEmpty(book.customAuthorsProp))
      book.customAuthorsProp = "Book author not available";

    // if array of objects
    if (book.authors) {
      for (let i = 0; i < book.authors.length; i++) {
        customAuthorsProp[i] = book.authors[i].name;
      }
    }

    // add space after each comma for a nicer display format
    if (
      Array.isArray(book.customAuthorsProp) &&
      book.customAuthorsProp.length > 1
    ) {
      book.customAuthorsProp = book.customAuthorsProp.join(", ");
    }

    /// cover ///
    let customCoverLinkProp = book.cover_id ?? book.cover_i;
    book.customCoverLinkProp = customCoverLinkProp;

    // if it doen't exist return book and default cover cover_default will be used.
    if (!book.customCoverLinkProp) {
      resolve(book);
    } else {
      fetchBookCover(book).then(() => {
        resolve(book);
      });
    }
  });
}

// func measureTextLength() measures books description text in pixels to apply text-align:center if it is too short. Otherwise default text-align:left will remain.
function measureTextLength() {
  let paragraphDescription = document.querySelector(".book-description");

  // gets some display's handy computed properties
  let paragraphCssProp = window.getComputedStyle(paragraphDescription);
  let paragraphFontSize = paragraphCssProp.getPropertyValue("font-size");

  // creates a temporary span to measure size of book description text. Sets same font properties for enhancing precision
  let ruler = createAndAttachElement(
    "span",
    { style: `font-size: ${paragraphFontSize};` },
    "body",
    "afterbegin",
    paragraphDescription.innerHTML
  );

  // measures the text
  let rulerWidth = ruler.getBoundingClientRect().width;
  ruler.remove();

  // apply only on vertical layout
  if (
    rulerWidth < paragraphDescription.offsetWidth &&
    window.innerWidth < 700 &&
    window.innerHeight > 540
  ) {
    paragraphDescription.style.textAlign = "center";
  }
}

export {
  mutationObserver,
  changeHeading,
  previousHeading,
  showPreviousBooks,
  bookDataHandler,
  measureTextLength,
};
