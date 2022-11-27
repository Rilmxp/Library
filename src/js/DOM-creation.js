"use strict";

import { createAndAttachElement } from "./page-creation";

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

initialElements.forEach((element) => {
  createAndAttachElement(
    element.tagName,
    element.attributes,
    element.attachTo,
    element.position,
    element.content
  );
});
