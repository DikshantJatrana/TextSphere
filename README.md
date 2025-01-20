# Text Sphere

Text Sphere is a web application designed to provide a live chat experience with the ability to share photos. It is built using modern web technologies to ensure a seamless and efficient user experience.

## Frontend

The frontend of Text Sphere is developed using:

- **React.js**: A JavaScript library for building user interfaces.
- **Redux**: A state management tool to manage the application state.
- **CSS/SCSS**: For styling the application.
- **Socket.io**: For real-time communication between the client and server.

## Backend

The backend of Text Sphere is powered by:

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: A web application framework for Node.js.
- **MongoDB**: A NoSQL database for storing user data and messages.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Socket.io**: For real-time communication between the server and client.

## Features

- **User Authentication**: Signup, login, logout, profile retrieval, and profile update.
- **Messaging**: Retrieve users for the sidebar, get messages, and send messages.
- **Photo Sharing**: Share photos within the chat.

## Routes

### Authentication Routes

- **POST /signup**: Route for user signup.
- **POST /login**: Route for user login.
- **POST /logout**: Route for user logout.
- **GET /profile**: Route to get the profile of the authenticated user.
- **POST /update**: Route to update the profile of the authenticated user.

### Messaging Routes

- **GET /users**: Route to get the list of users for the sidebar.
- **GET /:id**: Route to get messages for a specific user.
- **POST /send/:id**: Route to send a message to a specific user.

Text Sphere combines the power of modern web technologies to deliver a robust and interactive chat application.
