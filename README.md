# Cultured

Cultured is an online community where users can share fermentation recipes.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

In order to install this program, you will need to install [node.js](https://nodejs.org/en/) and [PostgreSQL](https://www.postgresql.org/).
I recommend using [pgAdmin](https://www.pgadmin.org/) for an interface.
You must also install the [Angular CLI](https://cli.angular.io/) in order to serve the Angular development sever.

### Installing and Deploying

Follow these steps to get a dev environment running on your local machine

1. Clone the Cultured repository to your local machine

```
git clone https://github.com/saramagdits/cultured.git
```

2. Install dependencies from the package.json

```
npm install
```

3. In PostgreSQL or pgAdmin, create a user the following credentials:

```
Username: cultured_admin
Password: <ANY PASSWORD>
```

4. Execute the cultured.sql file located in /server/db to create the cultured_db database and necessary tables.

5. Create an environment.js file in the /server/environment folder with the following:

```
const environment = {
  // database connection
  db: {
    user: 'cultured_admin',
    host: 'localhost',
    database: 'cultured_db',
    password: '<YOUR DB USER PASSWORD>'
  },
  sessionSecret: '<ANY STRING YOU CHOOSE>',
  upload: {
    avatars: '/<ABSOLUTE PATH TO PROJECT FOLDER>/cultured/client/src/assets/images/users/',
    recipes: '/<ABSOLUTE PATH TO PROJECT FOLDER>/client/src/assets/images/recipes/'
  }
};
module.exports = environment;
```

6.  Navigate to the /server folder and install dependencies.

```
npm install
```

7. Navigate to the /client folder and install dependencies.

```
npm install
```

8. Duplicate the _theming.scss file found in the /client folder, into the /client/node_modules/@angular/material.
Overwrite the existing _theming.scss file. Unfortunately, this was the only method of overwriting the prebuilt theme palette.


9. Navigate to the /server folder and start the Node server
```
npm start
```
10. Navigate to the /client folder and start the Angular Development server
```
ng serve
```

11. Visit the app by visiting http://localhost:4200/ or the equivalent.

## Built With

* [Node.js](https://nodejs.org/en/) - REST API for requesting and creating users and recipes.
* [Express](https://expressjs.com/) - Web application framework for Node.js.
* [Angular 6](https://angular.io/) - Single page application architecture and more.
* [PostgreSQL](https://www.postgresql.org/) - SQL database used to build the API.
* [Angular Material](https://material.angular.io/) - Component design and structure.
* [Multer](https://www.npmjs.com/package/multer) - Middleware for handling multipart/form data. Handles recipe and user avatar image uploads.
* [Passport](https://www.npmjs.com/package/passport) - Authentication middleware for Node.js. Used for authentication and authorization.
* [Bcrypt](https://www.npmjs.com/package/bcrypt) -  Password hashing library.

