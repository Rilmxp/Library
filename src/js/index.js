"use strict";

// imports to dinamically create the DOM on page load.
import { createAndAttachElement, initialElements } from "./page-creation.js";

// create inital elements
initialElements.forEach((element) => {
  createAndAttachElement(
    element.tagName,
    element.attributes,
    element.attachTo,
    element.position,
    element.content
  );
});

// font awesome imports
import "../assets/fontawesome/css/fontawesome.css";
import "../assets/fontawesome/css/brands.css";
import "../assets/fontawesome/css/solid.css";

// styles import
import "../styles/sass/styles.scss";

// image imports
import favicon from "../assets/img/favicon.png";

// variables
import { mutationObserver } from "./helpers";

let booksContainer = document.querySelector(".books-container");
let containerObserver = mutationObserver();
let heading = document.querySelector(".books-display-header");
const faviconHtml = document.querySelector("link[rel~='icon']");

import {
  BookContainerListener,
  formSubmissionListener,
} from "./event-listeners";
import {
  fetchDailyTrendingBooks,
  fetchBooksBySubject,
  fetchBookDescription,
  activeBooks,
} from "./http-requests";

// create and attach favicon
faviconHtml.href = favicon;

// import * as bootstrap from "bootstrap";

// import _, { create } from "lodash";

///////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// Creates event listener on form for submitting book subject
formSubmissionListener();

// shows all trending books at page load.
fetchDailyTrendingBooks();

// create the listener on bookContainer to trigger whenever user clicks on a book.
BookContainerListener();

export { booksContainer, heading, containerObserver };
