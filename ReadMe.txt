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
        - assets for fontAwesome files and images.
        - 



## Technologies / libraries / external resources

- HTML

- Javascript:

  - Two javascript files:

    - counter_creation.js for creating the counter section of the DOM.
    - counter_operations to make the counter works.

  - DOM Manipulation: addition/removal of classes, creation of pop-up messages and other elements both for building the DOM and to assist measurement of content in pixels ("ruler").

  - createAndAttachElement() for creating and attaching elements to the DOM when needed. The sole function creates, attaches, add attributes (including classes), and writes content to elements. Parameters are explained directly on the source code on counter_creation.js

  - updateCounter() function takes care of all the operations whenever a button is pressed. This function consists of two additional internal functions that assist in completing such tasks:

    - errorMessageDisplay() triggers whenever the above behavioural conditions are not met.

    - numBiggerThanDisplaySize() triggers whenever user presses the "+" button. It makes the standard addition operation but instead of updating the counter's display, it creates a "ruler" to measure the resulting number in pixels. It then compares it with the content width of the display, and if it does not fit in this one, errorMessageDisplay() will trigger. Element sizes where taken using both elem.clientWidth and Elem.getBoundingRect() (this one on a &lt;span&gt; as clientWidht() cannot be used on such element)

    - a setTimeOut() function was also implemented to assist in color change of numbers (from green or red back to normal), whenever the display is updated.

    - "click" event on buttons is handled with Event Delegation.

    - Additional notes on the above functions can be found directly on the code itself on counter_operations.js.

- CSS/SASS:

  - SASS partials are organized both by group of elements (\_links, \_counter-elements) or scope (\_config, \_media queries).
  - CSS msg-fade-in animation for feedback messages made with @keyframes

- Font-Awesome:
  - Icons for Github and Briefcase(&lt;a&gt; to my Portfolio).

## Responsiveness:

- max-height: 450px. set specifically for devices with a very low viewport height so all elements fit comfortably on the page.
- min-widht: 700px and min-height: 451px. It updates Buttons' layout and their order on the page as well as it upscales elements and font sizes.
- min-width: 1400px. Sets elements to a fixed width so they do not stretch indefinitely.




Files: 

- pageContentsCreation.js: page for creating and attaching elements.

- requests to https://openlibrary.org/subjects/


search box + button:

Workflow:
    - search box typing:

        - btn click:

            if valid genre:

                -fetch API subjects.
                    - if success:
                        - display books
                            - on book click:
                                - fetch https://openlibrary.org/works/{key}
                                - remove all other books.
                                - move chosen book center, change page layout, dispaly response
                                
                    - if failure:
                        - pop up. Pls try again later.
                        

review code.
consider putting an anchor to first book by clicling on h1 library
go to home, trending books when pressing on library, maybe using local storage.
when landscape let footer go down.

When loading books users can however interact with the already loaded books if they get msg books still loading

fix-tagname

