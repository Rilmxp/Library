// import * as bootstrap from "bootstrap";

// font awesome imports
import "../assets/fontawesome/css/fontawesome.css";
import "../assets/fontawesome/css/brands.css";
import "../assets/fontawesome/css/solid.css";
import "../styles/sass/styles.scss";

// variables.
import { booksLoaded } from "./http-requests";

// pics imports
import cover_default from "../assets/img/cover_default_small.jpg";
// import goldfinch from "../assets/img/goldfinch.jpg";
// import friend from "../assets/img/friend.jpg";
// import history from "../assets/img/history.jpg";

// javascript imports
import { createAndAttachElement, createBook } from "./page-creation.js";
import {
  fetchDailyTrendingBooks,
  fetchBooksBySubject,
  fetchBookDescription,
} from "./http-requests";

let booksContainer = document.querySelector(".books-container");

//     console.log(book);
// fetchDailyTrendingBooks();
fetchBooksBySubject();
// fetchBookDescription();
// const trendingBooksList = trendingBooks();

// for (const book in trendingBooksList) {
//   console.log(book.title, book.author_id, book.cover_i);
//   createBook(book.title, book.author_name, book.cover_i);
// }
// trendingBooksList.forEach(book => {
//   createBook(trending)
// }

// createBook("My Book", "richard Lucas", 1245, booksContainer);

import bookshelf from "../assets/img/bookshelf.jpg";

// console.log(bookshelf);
const coverDefault = cover_default;
// const pic1 = document.querySelector(".book-cover img");
// const pic2 = document.querySelector("#friend");
// const pic3 = document.querySelector("#history");
// console.log(bookshelfPic);
// pic1.src = cover_default;
// pic2.src = friend;
// pic3.src = history;

// to place viewer at the center of books.
// window.onload = function () {
//   let aboutUs = document.querySelector("#book2");
//   aboutUs.scrollIntoView({
//     block: "center",
//     inline: "center",
//     behavior: "auto",
//   });
// };

// Move element on click

let headline = document.querySelector(".trending");

let searchboxBooksContainer = document.querySelector(
  ".searchbox-books-container"
);

booksContainer.addEventListener("click", function (event) {
  // console.log("inside click", booksLoaded);
  console.log("book count", document.querySelectorAll(".book").length);
  // if (booksLoaded == false) return;
  // if (document.querySelectorAll(".book").length < 50) return;

  let target = event.target.closest(".book");

  /*
  //////////////////////////
  // INTERSECTION OBSERVER
  const bookList = document.querySelectorAll(".book");
  console.log(bookList);
  const options = {};

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      console.log(entry.target);
    });
  }, options);

  observer.observe(bookList[0]);
  //////////////////////////
  */

  ///////////////////////////
  /// MUTATION OBSERVER

  // console.log(booksContainer.childElementCount);
  // console.log("1st sibling", target.nextElementSibling);
  // console.log("2nd sibling", target.nextElementSibling.nextElementSibling);

  const mutationObserver = new MutationObserver((mutations) => {
    console.log(mutations);
    for (let mutation of mutations) {
      // console.log("mutation", mutation);

      for (let node of mutation.addedNodes) {
        console.log(node);
        if (node instanceof HTMLElement) {
          // console.log("HTML ELEM", node);
          node.style.display = "none";
        }
      }
    }
  });

  mutationObserver.observe(booksContainer, { childList: true });

  ///////////////////////////

  console.log(target);

  if (!target) return;

  let books = document.querySelectorAll(".book");
  target.classList.toggle("book-selected");

  if (target.classList.contains("book-selected")) {
    // hide all other books
    books.forEach((book) => {
      if (!book.classList.contains("book-selected")) {
        // book.classList.add("fade-out");
        book.style.display = "none";
      }
    });

    // add book description
    const lorem =
      "description The main character of Fantastic Mr. Fox is an extremely clever anthropomorphized fox named Mr. Fox. He lives with his wife and four little foxes. In order to feed his family, he steals food from the cruel, brutish farmers named Boggis, Bunce, and Bean every nigh. Finally tired of being constantly outwitted by Mr. Fox, the farmers attempt to capture and kill him. The foxes  in time by burrowing deep into the ground. The farmers decide to wait outside the hole for the foxes to emerge. Unable to leave the hole and steal food, Mr. Fox and his family begin to starve. Mr. Fox devises a plan to steal food from the farmers by tunneling into the ground and borrowing into the farmers houses.Aided by a friendly Badger, the animals bring the stolen food back and Mrs. Fox prepares a great celebratory banquet attended by the other starving animals and their families. Mr. Fox invites all the animals to live with him underground and says that he will provide food for them daily thanks to his underground passages. All the animals live happily and safely, while the farmers remain waiting outside in vain for Mr. Fox to show up.";
    createAndAttachElement(
      "p",
      { class: "plot" },
      ".book-selected",
      "beforeend",
      lorem
    );

    // console.log("1st sibling", target.nextElementSibling);
    // console.log("2nd sibling", target.nextElementSibling.nextElementSibling);

    // change layout of containers
    booksContainer.className = "books-container-selected";
    // booksContainer.style.maxHeight = "436px";
    searchboxBooksContainer.style.cssText = "min-height: 80vh";

    // change header
    changeHeading(headline, "Your book of choice");
    // headline.innerHTML = "Your book of choice";
  } else {
    // show all books again
    books.forEach((book) => {
      // book.style.opacity = "1";
      book.style.display = "";
    });

    // change back containers layout
    booksContainer.className = "books-container snap";
    searchboxBooksContainer.style.cssText = "height: 80vh";
    // headline.style.animation = "fade 1s ease";
    headline.innerHTML = "Trending today...";

    // remove book description
    document.querySelector(".plot").remove();

    // place viewer at same book position
    goToBook();

    // place view at same book position
    function goToBook() {
      target.scrollIntoView({
        block: "center",
        inline: "center",
        behavior: "auto",
      });
    }
  }

  function changeHeading(heading, text) {
    heading.classList.add("fade-out");
    heading.addEventListener("animationend", () => (heading.innerHTML = text));
    heading.classList.remove("fade-out");
    heading.classList.add("fade-in");
  }
});
