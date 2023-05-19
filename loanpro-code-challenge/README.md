# NTD Code Challenge Frontend
This project is the intended frontend for the API in the following repo: https://github.com/VenireVidereVincere/NTD-code-challenge-API

It's built with React JS and typescript, using Redux for state management and local storage for persisting data. 

## Requirements to run
In order to run the app you can either start up the Docker container with the docker files included, or you can use npm run start after having installed the dependencies. 

If you would like to use the docker approach, use the following commands:

- docker-compose build
- docker-compose up

If you would like to run it locally with npm, use the following commands:

- npm install
- npm run start

For both approaches you have to make sure you're at the root of the project. 

If you intend to run it locally with npm, you will have to add a .env file at the root of the project with the following variable:

- REACT_APP_API_URL=the url for your backend...

## Routes
The project has 3 routes:

* '/'
* '/new-operation'
* '/user-records'

The initial route is the login form, the other 2 are functionalities of the app. These functionalities are protected, so if you attempt to access them without first having logged in with the appropriate credentials, you will be redirected to the login page.

