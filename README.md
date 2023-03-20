# Project-3-Book-Management

# Lithium

## Project - Books Management

### Key points

- Create a group database `groupXDatabase`. You can clean the db you previously used and resue that.
- This time each group should have a single git branch. Coordinate amongst yourselves by ensuring every next person pulls the code last pushed by a team mate. You branch will be checked as part of the demo. Branch name should follow the naming convention `project/booksManagementGroupX`
- Follow the naming conventions exactly as instructed.

### Models

- User Model

yaml
{
  title: {string, mandatory, enum[Mr, Mrs, Miss]},
  name: {string, mandatory},
  phone: {string, mandatory, unique},
  email: {string, mandatory, valid email, unique},
  password: {string, mandatory, minLen 8, maxLen 15},
  address: {
    street: {string},
    city: {string},
    pincode: {string}
  },
  createdAt: {timestamp},
  updatedAt: {timestamp}
}


- Books Model

yaml
{
  title: { string, mandatory, unique },
  excerpt: { string, mandatory },
  userId: { ObjectId, mandatory, refs to user model },
  ISBN: { string, mandatory, unique },
  category: { string, mandatory },
  subcategory: [string, mandatory],
  reviews:
    { number, default: 0, comment: Holds number of reviews of this book },
  deletedAt: { Date, when the document is deleted },
  isDeleted: { boolean, default: false },
  releasedAt: { Date, mandatory, format("YYYY-MM-DD") },
  createdAt: { timestamp },
  updatedAt: { timestamp },
}


- Review Model (Books review)

yaml
{
  bookId: {ObjectId, mandatory, refs to book model},
  reviewedBy: {string, mandatory, default 'Guest', value: reviewer's name},
  reviewedAt: {Date, mandatory},
  rating: {number, min 1, max 5, mandatory},
  review: {string, optional}
  isDeleted: {boolean, default: false},
}


## User APIs

### POST /register

- Create a user - atleast 5 users
- Create a user document from request body.
- Return HTTP status 201 on a succesful user creation. Also return the user document. The response should be a JSON object like [this](#successful-response-structure)
- Return HTTP status 400 if no params or invalid params received in request body. The response should be a JSON object like [this](#error-response-structure)

### POST /login

- Allow an user to login with their email and password.
- On a successful login attempt return a JWT token contatining the userId, exp, iat. The response should be a JSON object like [this](#successful-response-structure)
- If the credentials are incorrect return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

## Books API

### POST /books

- Create a book document from request body. Get userId in request body only.
- Make sure the userId is a valid userId by checking the user exist in the users collection.
- Return HTTP status 201 on a succesful book creation. Also return the book document. The response should be a JSON object like [this](#successful-response-structure)
- Create atleast 10 books for each user
- Return HTTP status 400 for an invalid request with a response body like [this](#error-response-structure)

### GET /books

- Returns all books in the collection that aren't deleted. Return only book \_id, title, excerpt, userId, category, releasedAt, reviews field. Response example [here](#get-books-response)
- Return the HTTP status 200 if any documents are found. The response structure should be like [this](#successful-response-structure)
- If no documents are found then return an HTTP status 404 with a response like [this](#error-response-structure)
- Filter books list by applying filters. Query param can have any combination of below filters.
