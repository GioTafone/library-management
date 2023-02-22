## Installation

Use either `npm` or `yarn`.


you have two different folders:

1. `api:` where your backend lives

2. `client:` Frontend of your application

To install, you need to go to both directories and install their packages as such:

```bash
cd api
yarn install
```

```bash
cd client
yarn install
```

To run the `frontend` make sure you are under the client folder and:

````bash
yarn start
````

To run the `backend` make sure you are under the api folder and:

````bash
yarn start:dev
````

## `api` folder

1. Create a `.env` file in the root directory and copy the content from `.env.example`
2. Make sure MongoDB is running (if you are using local MongoDB)
3. If you need to customize your env, take a look at `secrets.ts` file
4. Separate routes and functions into routers, controllers, services folders

<br />

## `client` folder

1. Create a `.env` file in the root directory if you need to store secret data
2. You can complete your project using SASS, CSS, or other styling libraries

<br />
