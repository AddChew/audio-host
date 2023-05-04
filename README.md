# Audio Host
Audio File Hosting Web Application

## How to run the application

The following set of instructions assume that you already have docker and docker compose installed on your local machine. Application was tested with the following versions of docker and docker compose

|                | Version  | 
| -------------- | -------- |
| docker         | 20.10.17 |
| docker compose | v2.6.0   |

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

4. Navigate to http://localhost:3001/

5. Login with the following credentials to interact with the application

|               |       |
| ------------- | ----- |
| Username      | admin |
| Password      | admin |

## System architecture

![](/assets/system_architecture.png)

## API definition

Navigate to http://localhost:3000/docs/ for the API documentation

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
