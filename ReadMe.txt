# Library

Link to website: https://rilmxp-library.netlify.app/

Library is an http-requests based website which fetches books and its contents on demand.

The site is created programmatically with Javascript at loading.

All http-requests are made to the Open Library APIs at https://openlibrary.org/developers/api 

## Description

The website consists of a single page with a search box. 
At page loading, the website will fetch the trending books of the day and display them on the screen.

Users can search for books by providing a subject on the searchbox. Once the search has been submitted, books will be fetched and displayed on the screen.

Users can click on books anytime and their description will be displayed on the screen.

## Behaviour

- Trending books of the day will be fetched and display at loading.

- Searchbox submission:

    - if empty string: a invalid feedback message will appear below the searbox ("Please enter a book subject").

    - if books are still being loaded: an invalid feedback message will appear below the searchbox ("Books still loading, please try again later").

    - if valid input is provided, books fetch will be initiated.

    - search button is deactivated for 3s after each submission to prevent undesireable behavour in the code triggered by user interaction.

- Book fetch:

    - A loader spinner will be displayed whenever a  fetch request is active. It will disappear as soon as a response from the API has been received.

    - if the response is successful: books will be displayed, and headline will change ("love realted books", for eg).

    - if the response is not sucessful or empty: current books will be hidden and a feedback message will be displayed on the book container. This message will remain for 3 seconds and, afterwards, previous hidden books and heading will be shown back again.

    - Depending on the response from the different APIs the displayed book be displayed as follows:

        - title: its actual title or "Book title not available"
        - book cover: its actual image or a defaul image with message "book cover not available"
        - authors: its actual author/s or "Author not available"

- Book description:

    - Whenever user clicks on a book, its description will be provided.

    - On book click, all other books will be hidden, book container layout and heading will change.

    - Book desription will be fetched from API and, depending on response, its description will be displayed or, alternatively, "Book description not available".

## Files structure

    - Webpack configuration files divided into .common.js, .dev.js and .prod.js

    - src folder containing: 
        - assets folder for fontAwesome, fonts and images.
        - styles



## Technologies / libraries / external resources

-Webpack: 
    - configuration files divided into .common.js, .dev.js and .prod.js
    - css, javascript and html files have been minified and hashed as per best practices.

- HTML: 
    - A Handlebars template has been created to dinamically insert the title to the document.

- Javascript:

  - Five javascript files:
    
    - index.js: Webpack's entry point. DOM will be generated from this file and element variables will be created and exported for use of other functions in other files. All event listeners will be added to elements from this file and also the initial fetch of daily trending books will be called.

    - page-creation.js: contains only functions to create all sort of elements (books, loader spinner, messages). It also contains "initialElements" object which has all elements that will be create on page load.

    - event-listeners.js: to declutered index.js, all eventListeners have been wrapped in a function to be called directly on the entry point.

    -http-requests.js: contains all necessary fetch functions. For fetching daily trending books, search books by subject, book description and covers.

    -helpers.js: contains all kinds of functions used by the other scripts that do NOT create elements, event listeners or fetch APIs (changeHeading, bookDataHandler, for eg)

    Information about functions can be found directly on the source code.


- CSS/SASS:

  - SASS partials are organized either by group of elements (_footer-section, _books, ...) or scope (_config, _media queries).

- Font-Awesome:
  - installed via Webpack
  - Icons for Github and Briefcase(&lt;a&gt; to my Portfolio).

- Bootstrap:
    - Installed via Webpack
    - Forms (Searchbox - input-group -). Invalid feedback message. Form validity has been customized with setCustomValidity via javascript inside the formSubmissionListener.

## Responsiveness:

Since the width of the book elements has been set with vw unit many breakpoints have been set in small increments (500px, 600px, 700px, 950px, 1100px). A specific media query has been set for max-height: 540px to improve landscape view in devices with a very low viewport height.


