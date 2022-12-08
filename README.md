## Important update 08.12

Gentile start2impact coach:

SOLO su macOS e iOs, la chiamata Axios per la descrizione dei libri non sta al momento funzionando.
Non sono ancora riuscito a trovarne una soluzione.
Nella speranza di ricevere assistenza ho pubblicato una domanda su stackoverflow ed il gruppo discord del corso.
<<<<<<< HEAD
<<<<<<< HEAD
Apprezzerei molto dei suggerimenti in merito.
=======
Apprezerei molto dei suggerimenti in merito.
>>>>>>> 849a5c0de1a4e5ca1795eec23e7ffb508999de8d
=======
Apprezzerei molto dei suggerimenti in merito.
>>>>>>> 3dd8d70f0a2859545bbb90720602d6f4cb39c9e3
Il sito comunque funziona perfettamente su gli altri sistemi operativi.
Grazie.

link to stackoverflow query
https://stackoverflow.com/questions/74734774/axios-http-request-doesnt-trigger-on-macos-ios-only

# Library

Link to website: https://rilmxp-library.netlify.app/

Library is an HTTP messages-based website which fetches books and its contents on demand.

All HTTP requests are made to the Open Library APIs at https://openlibrary.org/developers/api

## Description

The website consists of a single page with a searchbox.
On page load, the website will fetch the trending books of the day and display them on the screen.

Users can search for books by providing a subject on the searchbox. Once the search has been submitted, books will be fetched and displayed on the screen.

Users can click on books anytime and their description will be displayed on the screen.

## Behaviour

- Trending books of the day will be fetched and display on page load.

- Searchbox submission:

  - if empty string: an invalid feedback message will appear below the searchbox ("Please enter a book subject").

  - if books are still being loaded: an invalid feedback message will appear below the searchbox ("Books still loading, please try again later").

  - if valid input is provided, books fetching will be initiated.

  - search button is deactivated for 3s after each submission to prevent undesireable behaviour in the code triggered by user interaction.

- Book fetching:

  - A loader spinner will be displayed whenever a fetch request is active. It will disappear as soon as a response from the API has been received.

  - if the response is successful: books will be displayed, and headline will change ("love related books", for eg).

  - if the response is not successful or empty: current books will be hidden and a feedback message will be displayed on the book container. This message will remain for 3 seconds and, afterwards, previous hidden books and heading will be shown back again.

  - Depending on the response from the different APIs the displayed book will be rendered as follows:

    - title: its actual title or "Book title not available"
    - book cover: its actual image or a default image with message "book cover not available"
    - authors: its actual author/s or "Author not available"

- Book description:

  - Whenever user clicks on a book, its description will be provided.

  - On book click, all other books will be hidden, book container layout and heading will change.

  - Book desription will be fetched from API and, depending on response, its actual description will be rendered or, alternatively, "Book description not available".

## Technologies / libraries / external resources

- Webpack:

  - configuration files divided into .common.js, .dev.js and .prod.js
  - css, javascript and html files have been minified and hashed as per best practices.

- HTML:

  - A Handlebars template has been created to dinamically inject the title into the document.
  - images are loaded lazily via the "loading" attribute of the image tag.

- Javascript:

  - Website created programatically on page load.

  - Five javascript files:

    - index.js:
      Webpack's entry point. DOM will be generated from this file and element variables will be created and exported for use of other functions in other files. All event listeners will be added to elements from this file and also the initial fetching of daily trending books will be called.

    - page-creation.js:
      contains only functions to create all sort of elements (books, loader spinner, messages). It also contains "initialElements" array with objects that will create the elements on page load.

    - event-listeners.js:
      to decluter index.js, all eventListeners have been wrapped in a function to be called directly on the entry point.

    - http-requests.js:
      contains all necessary fetch functions. For fetching daily trending books, books by subject, book description and covers.

    - helpers.js:
      contains all kinds of functions used by the other scripts that do NOT create elements, event listeners or fetch APIs (changeHeading, bookDataHandler, for eg)

  - Information about functions can be found directly on the source code.

- CSS/SASS:

  - SASS partials are organized either by group of elements (\_footer-section, \_books, ...) or scope (\_config, \_media queries).

- Axios:

  - Used for HTTP requests

- Lodash:

  - .\_isEmpty used for data handling of HTTP request responses.

- Font-Awesome:

  - Selected components installed via Webpack
  - Icons for Github and Briefcase(&lt;a&gt; to my Portfolio).

- Bootstrap:
  - Selected components installed via Webpack
  - Forms component used for the searchbox. Form validity has been customized with setCustomValidity() via javascript inside formSubmissionListener().

## Responsiveness:

Since the width of the book elements has been set with vw unit, many breakpoints have been set in small increments (500px, 600px, 700px, 950px, 1100px). A specific media query has been set for "max-height: 540px" to improve landscape view in devices with a very low viewport height.
