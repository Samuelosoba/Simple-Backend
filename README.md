# User Authentication and Role Management API

This is a Node.js REST API built with **Express.js** and **MongoDB**, providing secure user authentication, registration, and role-based access control. Admin users can manage roles and delete users.

---

##  Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- bcryptjs
- http-errors

---

API Endpoints
👤 Auth Routes
Register User
POST /api/auth/register


Request Body:

{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "yourpassword"
}


Success Response:

{
  "success": true,
  "message": "Account created successfully",
  "accessToken": "jwt_token"
}

Login User
POST /api/auth/login


Request Body:

{
  "email": "johndoe@example.com",
  "password": "yourpassword"
}


Success Response:

{
  "success": true,
  "accessToken": "jwt_token"
}

🛡 Admin Routes

All admin routes require a valid JWT from an admin user in the Authorization header as a Bearer token.

Get All Users
GET /api/users


Header:

Authorization: Bearer <admin_jwt_token>


Success Response:

[
  {
    "_id": "userId",
    "username": "johndoe",
    "email": "johndoe@example.com",
    "role": "user"
  },
  ...
]

Delete a User
DELETE /api/users/:userId


Header:

Authorization: Bearer <admin_jwt_token>


Success Response:

{
  "success": true,
  "message": "User deleted successfully"
}

Update a User's Role
PATCH /api/users/:userId/role


Header:

Authorization: Bearer <admin_jwt_token>


Request Body:

{
  "role": "admin"
}


Success Response:

{
  "success": true,
  "message": "User role updated to admin"
}

 Authentication & Role-Based Access

Authentication is handled via JWT.

JWTs are generated at login and sent in the Authorization header as:

Authorization: Bearer <token>


Role-based access:

Users with role "admin" can:

View all users

Delete any user

Change user roles

Regular users can only access their own data (not implemented in this version but can be added).

 Postman API Documentation

A Postman collection is available to test all routes.

Download the Postman Collection: Click here

 Authentication Flow

Register:
User submits username, email, and password.
Gets back an access token.

Login:
User submits email and password.
Receives a new access token.

Protected Routes:
Include access token in headers to access protected admin routes.
