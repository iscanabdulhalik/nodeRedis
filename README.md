# Mongo-Redis-CRUD

A Node.js-based RESTful API project that integrates **MongoDB** and **Redis** to perform CRUD operations efficiently with caching.

## Features

- Perform CRUD operations on user data.
- Redis integration
- MongoDB as the primary database.
- Express.js
- Data validation using Mongoose schemas.

## Technologies Used

- **Node.js**: Runtime environment for JavaScript.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing user data.
- **Mongoose**: ODM library for MongoDB.
- **Redis**: In-memory database for caching.
- **Body-parser**: Middleware for parsing JSON requests.

## Setup Instructions

### Prerequisites

1. Install **Node.js** (>=14.x) and **npm**.
2. Install **MongoDB** and ensure it is running on your machine.
3. Install **Redis** and ensure the server is running.

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/mongo-redis-crud.git
   cd mongo-redis-crud
   Install dependencies:
   ```

npm install

node app.js
The server will start on http://localhost:3023.

API Endpoints

1. Get All Users
   Endpoint: GET /users
   Description: Retrieves all users, using Redis cache if available.
2. Get User by ID
   Endpoint: GET /users/:id
   Description: Retrieves a single user by ID, using Redis cache if available.
3. Add a New User
   Endpoint: POST /users
   Description: Creates a new user and updates the cache.
   Request Body:
   json
   {
   "name": "John Doe",
   "email": "john@example.com",
   "age": 30
   }
4. Update a User
   Endpoint: PUT /users/:id
   Description: Updates a user's details and refreshes the cache.
5. Delete a User
   Endpoint: DELETE /users/:id
   Description: Deletes a user and removes the data from the cache.
   Testing
   Use tools like Postman or curl to test the API endpoints.

License
This project is licensed under the MIT License.

Author

Name: Abdulhalık İşcan

LinkedIn: linkedin.com/in/iscandev

GitHub: github.com/iscanabdulhalik
