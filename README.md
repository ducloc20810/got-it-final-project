# Overview
This is a category management project that allows people to share category and item list. It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://github.com/facebook/redux) and [Typescript](https://github.com/microsoft/TypeScript).

# Features

- [x] Login
- [x] Register
- [x] Category management
- [x] Item management

## Additional features
- [x] Auto login user if they have been logged in in the last session.
- [x] Disable button if form is invalid or while handling async action.
- [x] Auto redirect user to last page or previous page after performing create or delete action.
- [x] Improve accessibility that allows user to submit form or close modal by using keyboard.
- [x] Anonymous user will be redirected to login page if they try to create, edit or delete category/item. After user login, auto reopens the modal.
- [x] Apply skeleton while loading.

# Demo

[![](https://img.youtube.com/vi/Js2QM8Pv-hg/0.jpg)](https://www.youtube.com/watch?v=Js2QM8Pv-hg)

# Installation


### Setup Backend server
1. First [Docker](https://www.docker.com/) is required for running server.

2. If Docker had already been installed in your pc then you can clone and setup [Backend server](https://github.com/khuctrang/flask-photo-app)


### Setup project
1. Clone the repository

    `git clone git@github.com:ducloc20810/got-it-final-project.git`

    `cd got-it-final-project`

2. Setup project

    `npm install`

    Rename file `.env.example` to `.env`.



### Running project
In the project directory, you can run:

### Development
`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Testing
`npm run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Production

`npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
