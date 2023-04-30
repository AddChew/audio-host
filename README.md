# audio-host
Audio File Hosting Web Application

## Instructions on how to start backend application

1. Spin up database container
```
docker compose up -d db
```

2. Check status of containers
```
docker ps -a
```

3. Build backend container
```
docker compose build
```

4. Spin up backend container
```
docker compose up -d
```

## Instructions on how to start frontend application

Library versions for docker
```
node v18.16.0
```

```
cd frontend
npm install
npm run dev
```
