# Roit Test Backend

## A simple CRUD Api system with authentication for people registration based on the Roit Bank test

<br />
<br />

## A brief summary of my path

Hello people! This is my API project using Nestjs. It's my first time using Nestjs and MongoDB, so maybe it's possible to encounter some bad design decisions, but overall I've tried to keep my architectural best possible. I had to study from scratch how to build an API with these technologies, as my main experience is Django with Python and Django Rest Framework. I didn't worry about setting up the production environment as the repository needed to be private! :blush:

<br />

### Main Used tecnologies

- Nestjs with node and Express;
- MongoDB;
- Docker.

### Routes

For more details and documentation of the API routes and their data structures, see the link to Postman [here](https://www.getpostman.com/collections/04ade2a4ab9b7f8bcb40). You will need to import the [Postman Environment](https://github.com/AllanOliveiraM/roit-test-backend/blob/main/docs/Roit%20Environment.postman_environment.json).

<br />

### The api has three submodules

- users
- persons
- auth

### Security

The application has helmet protection, having the main HTTP headers necessary for the security of the requests.

The authentication system is based on JWT, signed from a private key served by environment variables.

Sensitive information like passwords are saved with bcrypt hash in the database.
The application is immune to brute force password time-comparison attacks as it compares hashes, not passwords.

### Hot to Run

#### Prerequisites

- `yarn` package manager installed globally in you computer;
- `make` command available in your environment;
- `docker` and `docker-compose` module installed in your computer if you want to use local database.

<br />

1 - Install Node Dependencies with the following command in the root path of project:

```sh
yarn
```

2 - Configure a new `.env` file based in `.env.example` file in root path of project directory.

You need a random enough and safe string to use as Secret. This value is used when signing auth tokens. Put your value in the variable `SECRET_KEY`.

The file content needs to look like this:

```env
NODE_ENV=development

# API SERVER
SERVER_PORT=3001
SECRET_KEY=YOUR_SECRET_HERE

# DB
# use default 27020 to prevent local mongo port conflicts
USE_CONNECTION_STRING=false
CONNECTION_STRING=undefined
DB_HOST=localhost
DB_PORT=27020
DB_NAME=roit
DB_USER=roit
DB_PASS=password
```

#### Explanation of variables

NODE_ENV: Defines if you running in `development` or `production` mode.
SERVER_PORT: The TCP-IP port to connect to server with HTTP protocol.
SECRET_KEY: Your secret key string. If you don't know what to put here in DEV environment, spank your keyboard ^^
USE_CONNECTION_STRING: If you prefer to use the complete MongoDB connection string, set this variable to `'true'`.
CONNECTION_STRING: If you checked to use the complete MongoDB connection string, pass it here.

Below are the database variables. They only need to be filled in if you don't use the full connection string.
If you have not checked to use the complete MongoDB connection string, pass the database connection information here:
DB_HOST=localhost
DB_PORT=27020
DB_NAME=roit
DB_USER=roit
DB_PASS=password

3 - Start database with `docker-compose` with the following command:

```sh
make up
```

This command will run `docker-compose up` already injecting the environment variables from the `.env` file.

4 - Start the API server with the following command:

```sh
yarn start:dev
```

| Now you can test the API!

### Available Scripts

#### Make Scripts

```sh
make up
```

This command starts the database server with docker.

```sh
make down
```

This command stop the database server.

```sh
make logs
```

This command show all logs from the database server.

#### Node Scripts

```sh
yarn postinstall
```

This command is run automatically on package installation and is responsible for installing the husky package hooks into the git repository.

```sh
yarn prebuild
```

Removes all previous build files.

```sh
yarn build
```

Creates a production build for app in `build` directory.

```sh
yarn start
```

Compiles and runs an application (or default project in a workspace).

```sh
yarn start:dev
```

Compiles and runs an application (or default project in a workspace) in watch mode for development.

```sh
yarn start:debug
```

Compiles and runs an application (or default project in a workspace) in watch and debug modes for development.

```sh
yarn start:prod
```

Runs the production code from build directory.

```sh
yarn reinstall
```

Remove `node_modules`, `yarn.lock`, `dist` and `build` files recursively and asynchronously and reinstall node modules.

```sh
yarn commit
```

Used in development for git commits with [git-cz](https://www.npmjs.com/package/git-cz).

```sh
yarn type-check
```

Perform a TypeScript type check in all project.

```sh
yarn prettier
```

Format all code files in src and main directories.

```sh
yarn prettier:check
```

Only check if code styles are correct.

```sh
yarn eslint
```

Run eslint and fix possible problems.

```sh
yarn eslint:check
```

Only check the code with eslint, reposring all errors.

### License

This project is not licensed.
