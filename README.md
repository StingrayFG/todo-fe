# todo-fe

## Running with docker
Backend part of the application can be found here https://github.com/StingrayFG/todo-be

To build the frontend image, run ```sudo docker buildx build -t todo-be .``` from the project root.


Before proceeding further, build the backend image first, as described in the respective repository's readme.

To run frontend, backend, and the database containers with docker compose run ```sudo docker compose up``` from the project root.

## Running without docker
From the project root run
```
npm i
cp .env.example .env
npm start
```
The frontend app will be available on http://localhost:3001/

