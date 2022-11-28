"use strict";

//File contains all functions and objects to create DOM elements.

import cover_default from "../assets/img/cover_default_small.jpg";
import { booksContainer } from "./index";

// func createAndAttachElement creates an element and attatches it to another one.
// params: tagName = "string", attributes = {prop:"string"}, attachTo = "css selector", position = "string" (as per insertAdjacentElement), content = "string".

function createAndAttachElement(
  tagName,
  attributes,
  attachTo,
  position,
  content = ""
) {
  let element = document.createElement(tagName);
  for (let property in attributes) {
    element.setAttribute(property, attributes[property]);
  }
  element.innerHTML = content;
  document.querySelector(attachTo).insertAdjacentElement(position, element);
  return element;
}

// func createBook creates book element
// params title = "string", author = "string", imgUrl = "image url",
function createBook(title, author, attachTo, imgUrl) {
  const html = `
  <div class="book book-fade-in">
    <div class="book-title">
      <h6>${title}</h6>
    </div>
    <div class="book-cover">
      <img loading="lazy" src=${imgUrl} alt="book cover">
      <div class="book-cover-message" style="display:${
        imgUrl == cover_default ? "" : "none"
      }">Book cover not available
      </div>
    </div>
    <div class="book-author">
      <p>${author}</p>
    </div>
  </div>
  `;
  attachTo.insertAdjacentHTML("beforeend", html);
}

// func createLoader creates a loader spinner to be placed always in the bookscontainer during loading of books.
// params: if create === false, loader will be removed
function createLoader(create = true) {
  if (create === false) {
    document.querySelector(".loader").remove();
  } else {
    const html = `
  <div class="loader">
    <div class="spinner"></div>
    <p>Loading books...</p>
  </div>`;
    booksContainer.insertAdjacentHTML("afterbegin", html);
  }
}

// initialElements are the objects from which DOM elements will be created on page load

const initialElements = [
  {
    tagName: "main",
    attributes: {},
    attachTo: "body",
    position: "beforeend",
  },
  {
    tagName: "h1",
    attributes: {},
    attachTo: "main",
    position: "beforeend",
    content: "LIBRARY",
  },
  {
    tagName: "div",
    attributes: { class: "searchbox-books-container" },
    attachTo: "main",
    position: "beforeend",
  },
  {
    tagName: "form",
    attributes: { novalidate: true },
    attachTo: ".searchbox-books-container",
    position: "beforeend",
  },
  {
    tagName: "h4",
    attributes: { class: "books-display-header" },
    attachTo: ".searchbox-books-container",
    position: "beforeend",
  },
  {
    tagName: "div",
    attributes: { class: "books-container snap scrollbar" },
    attachTo: ".searchbox-books-container",
    position: "beforeend",
  },
  {
    tagName: "div",
    attributes: { class: "input-group" },
    attachTo: "form",
    position: "beforeend",
  },
  {
    tagName: "input",
    attributes: {
      type: "text",
      class: "form-control has-validation",
      id: "input-search-subject",
      placeholder: "Book Subject",
      "aria-label": "Book Subject",
      "aria-describedby": "button-search-subject",
    },
    attachTo: ".input-group",
    position: "beforeend",
  },
  {
    tagName: "button",
    attributes: {
      class: "btn btn-outline-secondary",
      type: "submit",
      id: "button-search-subject",
    },
    attachTo: ".input-group",
    position: "beforeend",
    content: "Search",
  },

  {
    tagName: "div",
    attributes: { class: "invalid-feedback" },
    attachTo: ".input-group",
    position: "beforeend",
  },

  {
    tagName: "footer",
    attributes: { class: "page-footer" },
    attachTo: "body",
    position: "beforeend",
  },
  {
    tagName: "div",
    attributes: { class: "links" },
    attachTo: "footer",
    position: "beforeend",
  },
  {
    tagName: "a",
    attributes: {
      href: "https://github.com/Rilmxp/Library",
      target: "_blank",
      title: "Github",
    },
    attachTo: ".links",
    position: "beforeend",
  },
  {
    tagName: "i",
    attributes: {
      class: "fa-brands fa-github",
    },
    attachTo: "a[title='Github']",
    position: "beforeend",
  },

  {
    tagName: "a",
    attributes: {
      href: "https://rilmxp.github.io/Portfolio/",
      target: "_blank",
      title: "Portfolio",
    },
    attachTo: ".links",
    position: "beforeend",
  },

  {
    tagName: "i",
    attributes: {
      class: "fa-solid fa-briefcase",
    },
    attachTo: "a[title='Portfolio']",
    position: "beforeend",
  },
];

export { createAndAttachElement, createBook, createLoader, initialElements };
