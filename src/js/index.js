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
  screenResizeListener,
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

// create listener to decrease layout distorsions on mobile when virtual keyboard is open.
screenResizeListener();

export { booksContainer, heading, containerObserver };
