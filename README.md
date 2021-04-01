# Simple User Profile Application

## Prerequisities

1. Node 10.x +
2. Backend API running in the port 3333 or heroku. API URL should be set appropriately in environments

### Running the application

1. Install dependencies

```
npm i
```

There are two ways to run the application.

2. Application can be started in dev mode by running the following command

```
npm run dev
```

Application will be served at http://localhost:4200/. The app will automatically reload if there is change in any of the source files.

3. Build the prototype and serve it using static server

Build the prototype using the below command to use dev configuration (src/environments/environment.ts)

```
npm run build:dev
```

Serve the prototype using command

```
npm start
```

Application will be served at http://localhost:8080

### Linting and formatting of source code

Source can be formatted using prettier by running

```
npm run format
```

Source code can be linted using TS lint by executing the command

```
npm run lint
```

Formatting and linting will happen automatically before committing. Commit will fail if there are any lint errors.
