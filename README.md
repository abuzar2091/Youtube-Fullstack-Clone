# YouTube: MERN Stack YouTube Clone

This repository hosts the codebase for YouTube, a YouTube clone built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. YouTube enables users to interact with a frontend interface to upload videos, which are securely stored in Cloudinary cloud storage. Users can sign up and log in, with their information securely stored in MongoDB.

# Features:

- User authentication using JWT (JSON Web Tokens) for secure login.
- Frontend interface for users to create channels, upload, delete, and update videos.
- Ability for users to like, dislike, and comment on videos.
- Detailed channel information, including the number of uploaded videos and subscribers.
- Interaction with API endpoints to retrieve and manipulate data.

# Directories:

- frontend: Contains the frontend code for user interaction.
- backend: Contains the backend code for handling authentication, video storage, and API endpoints.

# Technologies used:

MongoDB: Database storage for user information and video metadata.
Express.js: Backend framework for handling API requests.
React.js: Frontend library for building user interfaces.
Node.js: Server-side scripting for backend operations.
Cloudinary: Cloud storage for securely storing uploaded videos


# Setup Instructions
```bash
1. To begin, clone the Git repository to your local machine:
- git clone <repository_url>
2. Next, navigate to the backend directory:
- cd backend
3. Install the required dependencies using npm:
- npm install
4. Create a .env file based on the provided .env.sample file and fill in the necessary environment variables as required by the project.
5. After configuring the backend, navigate to the frontend directory: 
- cd frontend
6. Install the required dependencies using npm:
- npm install
7 You can now start interacting with the application using the following commands:
- npm run dev

This command will start the development server and enable you to begin interacting with the application.
