## How to run app using docker
- `docker-compose up -d --build` to start app
- `docker-compose down` to stop app

## How to run app locally
- `npm i` to install app dependencies
- `redis-server` to start a redis server instance
- `npm run dev` to start app

## How to run test cases
- `npm run test`

## Endpoints
### GET /user?page=1&limit=10
Fetch a paginated list of users

### GET /user/:id
Fetch a user by id

### GET /user/account-number/:id
Fetch a user by account number

### GET /user/identity-number/:id
Fetch a user by identity number

### POST /user
Create a new user

### PATCH /user/:id
Update an existing user

### DELETE /user/:id
Delete a user