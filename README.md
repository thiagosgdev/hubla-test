# Hubla Backend Test - Thiago Gonçalves

## Disclaimer

Given the test instruction, I choose to only do the backend of the test, because NOW I don't know how to build a frontend application that I can be satisfied to deliver. I only have experience as a backend developer but with this test, I saw the need of studying how to build a frontend app. I'm studying now HTML and CSS, after that I'll look into React.

## API Description

- The API has the option to receive a file, parse it's lines and following the data structure in the instruction file, get the information and persist in the DB.
- To be able to use a Authentication method, I created a users table, that can be populated by the Signup route or while inserting the data from the transactions file, it'll create a new user, if no user exists with the same. It isn't the best practice, but for a test, I thought it would be a good thing to do.
- For the Authorization, I built a Guard to use as decorator and receive which roles can used the route. It can be seen in the `shared/providers/EncryptProvider`.
- To run the unit tests, in the terminal, you can use the command `yarn test`.

### Routes

- POST `/users/signup` - Creates a new user
- POST `/users/sign` - Authenticates a user
- GET `/users/transactions` - Returns an array of User and it's transactions
- POST `/transactions` - Receives a file, parses it, persist the data in the DB and returns the transactions added.
- GET `/transactions/amount/{userId}` - Return the transactions amount from a given user

A more detailed description of the routes is avaiable in the `/api/docs` route.

## Using Docker

- Navigate to the project folder and rename the file `.env.example` to `.env` and check if you need to change any variable value.
- In a terminal, in the project folder, run the command `docker-compose up`. This will start the DB, runs the migrations and start the API.
- Now you can send request throw `http://localhost:{PORT}`. The `{PORT}` is what you put on PORT in the `.env` file. And you can send a request to the route `/api/docs` to check all endpoints available.
- You can also import the postman file available in the root of the project.
