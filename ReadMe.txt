Pseudo:
Title: My Library

Files: 

- pageContentsCreation.js: page for creating and attaching elements.

- requests to https://openlibrary.org/subjects/


search box + button:

    - bootstrap
    - autocomplete (get list of genres at page loading)

Workflow:
    - search box typing:
        - autocomplete genres.

        - btn click:
            if not valid genre:

                - prompt user for valid input
        
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


Footer:
    - My portoflio + github logo/links / Fontawesome