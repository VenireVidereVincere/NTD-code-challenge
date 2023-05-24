# NTD Code Challenge Frontend
This project is the intended frontend for the API in the following repo: https://github.com/VenireVidereVincere/NTD-code-challenge-API

It's built with React JS and typescript, using Redux for state management and local storage for persisting data. 

## Requirements to run
In order to run the app you can either start up the Docker container with the docker files included, or you can use npm run start after having installed the dependencies. 

### Docker
Make sure to open the docker-compose file and edit the following env variable to your own in order for it to work. You can leave the placeholder in, the app will run but no operations will be possible:

- REACT_APP_API_URL=the url for your backend...

Make sure the url does not have a trailing forwardslash!: www.url.com is ok, www.url.com/ is not. 

- docker-compose build
- docker-compose up

### Non-containerized
Make sure to add an .env file at the root of your project with the following:

- REACT_APP_API_URL=the url for your backend...

Make sure the url does not have a trailing forwardslash!: www.url.com is ok, www.url.com/ is not. 

- npm install
- npm run start

For both approaches you have to make sure you're at the root of the project. 


## Routes
The project has 3 routes:

* '/'
* '/new-operation'
* '/user-records'

The initial route is the login form, the other 2 are functionalities of the app. These functionalities are protected, so if you attempt to access them without first having logged in with the appropriate credentials, you will be redirected to the login page.

