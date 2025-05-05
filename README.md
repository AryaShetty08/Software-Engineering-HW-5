# Software Engineering Homework 5

## Context
- I ran both the code and the jasmine tests through the VScode terminal
- I also made sure node.js, jasmine, supertest, http, and other packages were in order before running

## Setup for hw5.js code 
- To run the actual hw5.js code make sure you are in the lib folder (example:
     " C:\Users\aryas\Desktop\Rutgers 2021-2025\Spring 2024\Software Engineering\Homeworks\Homework 5\lib ")
- Then in the VScode terminal run "node hw5.js"
- Then to test just the code you can open up your postman app
- Start a new request and change the type to POST since the server accepts that for the body request
- Type in "localhost:8080" where your server is running
- Then in the tabs below the send go to "Body"
- From here you can select three options
    - Select "x-www-form-urlencoded" to send a url request, enter your parameters for key, value, decription
    - Select "raw"
        - Choose "Text", and enter in plain text
        - Choose "JSON", and enter in JSON data
- Once your content type and request is set, and your server is running by running the "node hw5.js" in your terminal, hit the blue "Send" button
- You will get your response in Postman
    - It will either be an error due to unsupported content type, error due to wrong format for selected content type, or it will succesfully parse and return the same message request from the client
    - If it totally doesn't run then the server was not started

## Setup for jasmine test cases
- For the jasmine test cases make sure to go back one folder from lib into homework5 (using cd ..) 
- (example: " C:\Users\aryas\Desktop\Rutgers 2021-2025\Spring 2024\Software Engineering\Homeworks\Homework 5 ")
- Then to run the cases just type in the terminal "npx jasmine"
- It should run 14 specs or test cases and 0 failures

## IMPORTANT
- In this testing, the "hw5.js" acts as your server, and you can send client requests through Postman
- The jasmine tests do the same and show all the different scenarios
- Code meanings:
    - 200 - successful
    - 400 - error when parsing
    - 405 - did not use POST when in client
    - 415 - did not send right content-type