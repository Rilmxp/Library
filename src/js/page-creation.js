"use strict";

// creates an element and attatches it to another one.
// args tagName = "string", attributes = {prop:"string"}, attachTo = "css selector", position = "string" (as per insertAdjacentElement), content = "string".

import cover_default from "../assets/img/cover_default_small.jpg";
import { booksContainer } from "./index";

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

// create book element

// params title = "string", author "string", imgUrl = "imgage url",
function createBook(title, author, attachTo, imgUrl) {
  const html = `
  <div class="book book-fade-in" id="book1">
    <div class="book-title">
      <h6>${title}</h6>
    </div>
    <div class="book-cover">
      <img loading="lazy" src=${imgUrl} alt="book cover" id="goldfinch">
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

// Creates loader spinner to be placed always in the bookscontainer during loading of books. if remove === true, loader will be remove

function createLoader(remove = false) {
  if (remove === true) {
    const loader = document.querySelector(".loader");
    loader.style.display = "none";
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

export { createAndAttachElement, createBook, createLoader };
