# Audio Host
Audio File Hosting Web Application

## How to run the application

1. Navigate into project root directory (i.e. audio-host)
```
cd audio-host
```

2. Build services
```
docker compose build
```

3. Create and start containers
```
docker compose up -d
```

4. Navigate to http://localhost:3001/ to interact with the application

## System architecture
TODO:

## API definition

### Authentication

| Method | Endpoint        | Function          |
| -------|---------------- | ----------------- |
| POST   | /auth/register  | Register new user |
| POST   | /auth/login     | Login user        |
| DELETE | /auth/logout    | Logout user       |

### Users

| Method | Endpoint        | Function               |
| -------|---------------- | ---------------------- |
| GET    | /users/         | Retrieve list of users |
| POST   | /users/         | Create new user        |
| GET    | /users/:userid  | Retrieve user by userid|
| PUT    | /users/:userid  | Update user by userid  |
| DELETE | /users/:userid  | Delete user by userid  |

### Files

| Method | Endpoint        | Function               |
| -------|---------------- | ---------------------- |
| GET    | /files/         | Retrieve list of files |
| POST   | /files/         | Create new file        |
| GET    | /files/:fileid  | Retrieve file by fileid|

## Ports

| Service       | Port  |
| ------------- | ----- |
| Database      | 5432  |
| Frontend      | 3001  |
| Backend       | 3000  |
