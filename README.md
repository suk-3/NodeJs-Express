# NodeJs-Express Template

This repository provides a basic template for a Node.js application using Express. Follow the instructions below to set up and run the application.

## Installation

### Install Node.js

1. Download the installer from the official Node.js website: [Node.js](https://nodejs.org).
2. Run the installer and follow the instructions to complete the installation process.

### Clone the Repository

1. Open a terminal or command prompt.
2. Navigate to the directory where you want to clone the repository.
3. Run the following commands:
    ```sh
    git clone https://github.com/suk-3/NodeJs-Express.git
    cd NodeJs-Express
    ```

## Setting up the Project

### Install Dependencies

1. In the terminal or command prompt, navigate to the cloned repository directory.
2. Run the following command to install all the dependencies listed in the `package.json` file:
    ```sh
    npm install
    ```

## Application Code

### Understanding the Code Structure

1. The main application code is in the `index.js` file. This file sets up the Express server, defines routes, sets up middleware, and handles requests and responses.

2. Route definitions are kept in the `routes` folder. For each function, create a separate folder. For example, for a health check route, create a folder named `health` with the following structure:
    ```
    health
    └── controller.js
    ```

### Adding Routes

1. In the `routes` folder, create a new folder for your function, for example, `functional`:
    ```
    functional
    └── controller.js
    ```

2. Include the source in `route.js`:
    ```js
    const info = require('./functional/controller');
    router.get('/<routename>', info.methodName);
    ```

### Example for a Health Check Route

1. Create a folder named `health`:
    ```
    health
    └── controller.js
    ```

2. In `controller.js`, define the functionality:
    ```js
    // health/controller.js
    const functionality = (req, res) => {
        response = {}
        //functiona Logic to be written here 
        res.json(response);
    };

    module.exports = {
        functionality
    };
    ```

3. Include the source in `route.js`:
    ```js
    const health = require('./health/controller');
    router.get('/health', health.functionality);
    ```

## Running the Application

### Start the Server

1. In the terminal or command prompt, navigate to the repository directory.
2. Run the following command to start the Node.js application:
    ```sh
    npm start
    ```
3. You should see output indicating that your application is running, such as "Server listening on port 3000" or similar.

## Testing the Application

### Verify the Application

1. Open a web browser.
2. Navigate to `http://localhost:3000` (or the appropriate port specified in your application code).
3. If everything is set up correctly, you should see your Node.js application running and responding to requests.
