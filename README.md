# insurance

# 1. Backend

<ul>
  <li><a href='https://nodejs.org/en/'>Node.js</a>: backend framework;</li>
  <li><a href='https://expressjs.com/'>Express.js</a>: http server and routing;</li>
  <li><a href='https://sequelize.org/master/'>sequelize.js</a>: database ORM;</li>
</ul>


# Getting started

to start working with the project just :

```sh

# backend dir
cd backend
# install the dependancies
npm install
#Create your .env file // refer the the evironment variables block
#start the dev server
npm run dev
```

# Environment variables

The application expects to find a .env file containing the following variables:

```sh
# The http server port
PORT=3000
# the name of the project database in the mysql server you are using
CREATE DATABASE insurancedb;

#Create User
CREATE USER 'insurancedev'@'%' IDENTIFIED BY 'insurance1234';

#Grant access to user
GRANT ALL PRIVILEGES ON `insurancedb`.* to 'insurancedev'@'%';
# the APIs routes base path (/api/v1 to conform with the swagger documentation)
BASE_PATH=/api/v1
```

# Architecture

The architecture is made while respecting the solid and clean architecture principales to ensure maximum independancy between the app components.

### Folders:

-   **models _(dir)_ :** contains the models for the application Objects(databse models/tables) with all the business logic required. each model have it own file and is made independant from the chosen ORM. _(this is the quivalent of the model in the mvc controller)_

-   **controllers _(dir)_ :** contains the controllers for each model and is independant from the router and the model. if the controller doesn't need any special logic consider using the controller builder in the helpers/utils.js _(this is the quivalent of the controller in the mvc controller)_

-   **services _(dir)_ :** contains functions that can be used by the controllers .

-   **routes _(dir)_ :** Contains the routes for each model/controller and are made independent from the routing framework

-   **helpers _(dir)_ :** Contains utilities.

-   **database _(dir)_ :** Contains all the elements for intiating the ORM

### Files:

-   **server _(file)_ :** Configures, initiates the express application and start the server


----------------------------------------------------------------------------------------------------------------------------------------------------------------



# 2. Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.2.

# frontend dir
cd frontend/insurance_frontend
# install the dependancies
npm install


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
