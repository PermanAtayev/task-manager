# task-manager
The task-manager api is deployed at https://perman-task-manager.herokuapp.com/

## Build
First of all, initialise the npm and install all of the api's dependencies.
Then, to build the application on your machine you can either use a developer mode:
```
npm run dev
```
or a usual mode:
```
npm start
```

## User related requests

Only for the sign-up and log-in you don't need to be authenticated, for all other requests authentication is a requirement.

To sign-up a user request
```
POST /users
```
needs to be sent where ```email``` and ```password``` fields of the request are required, and ```name, age, tokens, avatar``` are optional. If your sign-up was successful, an email to the provided with the welcome message will be sent.

To log-in request
```
POST /users/login
```
needs to be sent where ```email``` and ```password``` are required.

To log-out from the latest log-in request
```
POST /users/logout
```
needs to be sent, and obviously to log-out you need to be logged in:)

To get the info about your profile request
```
GET /users/me
```

To update some information in your profile request
```
PATCH /users/me
```
needs to be sent to the server with the fields you want to update and the new information there

To delete your user request
```
DELETE /users/me
```
needs to sent, if the deletion went successful an email will be sent to the user's email address.

To upload an avatar picture for your profile request with the desired picture
```
POST /users/me/avatar
```
needs to be sent; then the picture will be resized to 250x250 and saved to the database

To delete a picture from your avatar request
```
DELETE /users/me/avatar
```

## Task related requests
For all of the requests below an authentication is required.

To create a task request
```
POST /tasks
```
needs to be sent, where ```description``` field of the task is required and ```completed``` field of the task is set to false by default.

To read a specific task request
```
GET /tasks/:id
```
needs to be sent with an id of a desired task

You can filter tasks that you want to see by using either of the options below
```
?completed
?limit=x&skip=x
?sortBy=createdAt:x
```
For ```completed``` filter you need to provide a truth value. For ```limit, skip``` you need to provide a number, where limit will set a limitation to how many tasks will be returned for your query, and skip sets number of tasks that will be skipped without being displayed.

To update some task request
```
PATCH /tasks/:id
```
where :id is an id of the task

To delete a task request
```
DELETE /tasks/:id
```
where :id is an id of the task

## Task related requests
To test the api enter this command:
```
npm test
```

## Third-party libraries:
Following is a list of third-party libraries used in building this web service:
- [express](https://www.npmjs.com/package/express)
- [sendgrid](https://www.npmjs.com/package/sendgrid)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [mongodb](https://www.npmjs.com/package/mongodb)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [multer](https://www.npmjs.com/package/multer)
- [sharp](https://www.npmjs.com/package/sharp)
- [validator](https://www.npmjs.com/package/validator)
- [env-cmd](https://www.npmjs.com/package/env-cmd)
- [jest](https://www.npmjs.com/package/jest)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [supertest](https://www.npmjs.com/package/supertest)
