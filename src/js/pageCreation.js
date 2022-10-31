"use strict";

// creates an element and attatches it to another one.
// args tagName = "string", attributes = {prop:"string"}, attachTo = "css selector", position = "string" (as per insertAdjacentElement), content = "string".

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

export default createAndAttachElement;
