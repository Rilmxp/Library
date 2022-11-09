"use strict";

// creates an element and attatches it to another one.
// args tagName = "string", attributes = {prop:"string"}, attachTo = "css selector", position = "string" (as per insertAdjacentElement), content = "string".

import cover_default from "../assets/img/cover_default.jpg";

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
  <div class="book" id="book1">
      <h2 class="book-title">${title}</h2>
      <div class="book-cover">
        <img src=${imgId} alt="book cover" id="goldfinch">
        <div class="book-cover-message" style="display:${
          message == true ? "" : "none"
        }">Book cover not available
        </div>
      </div>
    <footer class="book-author">${author}</footer>
  </div>
  `;
  attachTo.insertAdjacentHTML("beforeend", html);
}

export { createAndAttachElement, createBook };
