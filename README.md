# Fitswave Signup API

> A robust API designed to be comprehensive and usable in a variety of scenarios, featuring security systems that make it a highly reliable solution.

## Table of Contents

1. [Introduction](#introduction)
2. [Resources](#resources)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Usage](#usage)
7. [Endpoints](#endpoints)
8. [Error Handling](#error-handling)
9. [Contribution](#contribution)

## Introduction

This is an API microservice aimed at creating notifications in a clear and direct way.

## Resources

The main features of this API include:

- Notification CRUD operations;
- Mail service for notification activity;
- Design Pattern (SOLID);
- Validating body content.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (LTS or Latest Version);
- MongoDB Database.

## Installation

To install the API locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/matheusPavaneli/notification-microservice.git

# Navigate into the project directory
cd notification-microservice

# Install the required dependencies
npm install
```

## Configuration

Set up environment variables by creating a `.env` file in the project root with the following structure:

```bash
PORT=YOUR_PORT
CONNECTION_URL=YOUR_CONNECTION_URL
EMAIL_USER=YOUR_MAIL_USER
EMAIL_PASS=YOUR_MAIL_PASS
```

## Usage

Run the API using the following commands:

For development environment:

```bash
npm run dev
```

For production environment:

```bash
npm start
```

## Endpoints

### **POST** `/`

- **Description**: Create a new notification.
- **Request Body**:
  - `recipient` (required);
  - `message` (required);
  - `mail` (optional);
  - `read` (optional).
- **Response Example**:

```json
{
  "status": "success",
  "data": {
    "statusCode": 200,
    "message": "Your notification has been created successfully",
    "content": {
      "recipient": "recipienttest",
      "message": "test",
      "read": false,
      "mail": "test@test.com",
      "_id": "678717479ad2cb5ecd3753aa",
      "createdAt": "2025-01-15T02:02:47.181Z",
      "__v": 0
    }
  }
}
```

### **GET** `/:recipient`

- **Description**: Get all notifications by recipient.
- **Request Params**:
  - `recipient` (required).
- **Response Example**:

```json
{
  "status": "success",
  "data": {
    "statusCode": 200,
    "message": "",
    "content": [
      {
        "recipient": "recipienttest",
        "message": "test",
        "read": false,
        "mail": "test@test.com",
        "_id": "678717479ad2cb5ecd3753aa",
        "createdAt": "2025-01-15T02:02:47.181Z",
        "__v": 0
      },
      {
        "recipient": "recipienttest",
        "message": "test",
        "read": false,
        "mail": "test@test.com",
        "_id": "678717479ad2cb5ecd3753aa",
        "createdAt": "2025-01-15T02:02:47.181Z",
        "__v": 0
      }
    ]
  }
}
```

### **PUT** `/:id/read`

- **Description**: Mark task as read by id.
- **Request Params**:
  - `id` (required)
- **Response Example**:

```json
{
  "status": "success",
  "data": {
    "statusCode": 200,
    "message": "Your notification has been updated sucessfully!",
    "content": {
      "recipient": "recipienttest",
      "message": "test",
      "read": true,
      "mail": "test@test.com",
      "_id": "678717479ad2cb5ecd3753aa",
      "createdAt": "2025-01-15T02:02:47.181Z",
      "__v": 0
    }
  }
}
```

### **DELETE** `/:id/read`

- **Description**: Delete task by id.
- **Request Params**:
  - `id` (required)
- **Response Example**:

```json
{
  "status": "success",
  "data": {
    "statusCode": 200,
    "message": "Your notification has been deleted sucessfully!",
    "content": {
      "recipient": "recipienttest",
      "message": "test",
      "read": false,
      "mail": "test@test.com",
      "_id": "678717479ad2cb5ecd3753aa",
      "createdAt": "2025-01-15T02:02:47.181Z",
      "__v": 0
    }
  }
}
```

### **PUT** `/:id/update`

- **Description**: Update task by id;
- **Request Params**:
  - `id` (required)
- **Request Body**:
  - `recipient` (optional);
  - `message` (optional);
  - `mail` (optional);
  - `read` (optional).
- **Response Example**:

```json
{
  "status": "success",
  "data": {
    "statusCode": 200,
    "message": "Your notification has been updated sucessfully!",
    "content": {
      "_id": "677f3a37e81d190945eeeb7d",
      "recipient": "updatedrecipient",
      "message": "updatedmessage",
      "read": false,
      "mail": "test@test.com",
      "createdAt": "2025-01-09T02:53:43.044Z",
      "__v": 0
    }
  }
}
```

## Error Handling

The API follows standard HTTP error codes to indicate the result of a request. Here are the common errors:

- **BadRequestError (400)**: Invalid input or request parameters.
- **UnauthorizedError (401)**: Authentication required or invalid credentials.
- **ForbiddenError (403)**: Access to the requested resource is denied.
- **NotFoundError (404)**: The requested resource could not be found.
- **ConflictError (409)**: Conflict in the request, such as duplicate data.
- **UnprocessableEntityError (422)**: The server understands the request but cannot process it due to invalid data.
- **InternalServerError (500)**: An unexpected condition was encountered on the server.
- **Not Modified (304)**: Occurs when the request does not change any information.

## Contribution

Contributions are welcome! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b my-new-feature`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin my-new-feature`.
5. Open a Pull Request.
