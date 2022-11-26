Pseudo:

To do: - favicon.
       - Creation of page at loading.

Title: My Library

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
                        
creation page at loading.
review code.
consider putting an anchor to first book by clicling on h1 library



