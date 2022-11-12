"use strict";

// creates an element and attatches it to another one.
// args tagName = "string", attributes = {prop:"string"}, attachTo = "css selector", position = "string" (as per insertAdjacentElement), content = "string".

import cover_default from "../assets/img/cover_default_small.jpg";

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

// params title = "string", author "string", imgId = "imgage url", message = boolean
function createBook(
  title,
  author,
  attachTo,
  imgId = cover_default,
  message = false
) {
  const html = `
  <div class="book book-fade-in" id="book1">
    <div class="book-title">
      <h6>${title}</h6>
    </div>
    <div class="book-cover">
      <img loading="lazy" src=${imgId} alt="book cover" id="goldfinch">
      <div class="book-cover-message" style="display:${
        message == true ? "" : "none"
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

export { createAndAttachElement, createBook };
