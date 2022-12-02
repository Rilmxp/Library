"use strict";

// font awesome imports
import "../assets/fontawesome/css/fontawesome.css";
import "../assets/fontawesome/css/brands.css";
import "../assets/fontawesome/css/solid.css";

// styles import
import "../styles/sass/styles.scss";

// image imports
import favicon from "../assets/img/favicon.png";

// imports to dinamically create the DOM on page load.
import { createAndAttachElement, initialElements } from "./page-creation.js";

// create initial elements
initialElements.forEach((element) => {
  createAndAttachElement(
    element.tagName,
    element.attributes,
    element.attachTo,
    element.position,
    element.content
  );
});

let metaViewport = document.querySelector("meta[name=viewport]");
metaViewport.setAttribute(
  "content",
  "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
);

// variables
import { mutationObserver } from "./helpers";

const booksContainer = document.querySelector(".books-container");
const containerObserver = mutationObserver(); // creates an observer for .booksContainer changes.
const heading = document.querySelector(".books-display-header");
const faviconHtml = document.querySelector("link[rel~='icon']");

// event listeners
import {
  BookContainerListener,
  formSubmissionListener,
} from "./event-listeners";

// for fetching trending books on page load.
import { fetchDailyTrendingBooks } from "./http-requests";

// create and attach favicon
faviconHtml.href = favicon;

// Creates event listener on form for submitting book subject
formSubmissionListener();

// shows all trending books at page load.
fetchDailyTrendingBooks();

// create the listener on bookContainer to trigger whenever user clicks on a book.
BookContainerListener();

// keyboard

////////////////////////////////////////////////7

//actual device sizes
let initialHeight = window.innerHeight;
let initialWidth = window.innerWidth;

let inputField = document.querySelector("input");

window.addEventListener("resize", function () {
  let currentHeight = window.innerHeight;
  let currentWidth = window.innerWidth;

  if (initialWidth === currentWidth) {
    // check if virtual keyboard is present (takes up part of the viewport's height)
    if (currentHeight < initialHeight) {
      metaViewport.setAttribute(
        "content",
        "height=" + initialHeight + "px, width=device-width, initial-scale=1.0"
      );
    } else {
      metaViewport.setAttribute(
        "content",
        "width=device-width, initial-scale=1.0"
      );
    }
  }

  // if orientation has changed.
  if (initialWidth !== currentWidth) {
    if (document.hasFocus()) inputField.blur();

    metaViewport.setAttribute(
      "content",
      "width=device-width, initial-scale=1.0"
    );
    // // new initial width and height.
    setTimeout(() => {
      initialWidth = currentWidth;
      initialHeight = currentHeight;
    }, 1000);
  }
});

export { booksContainer, heading, containerObserver };
