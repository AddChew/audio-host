# audio-host
Audio File Hosting Web Application

## Required Dependencies

### Node.js
express
pg
postgres
sequelize

## Directory/File guide

### backend

src/utils/database.js
- handles the postgres database connection

src/models/user.js
- define user database model

src/models/file.js
- define file database model

src/controllers/users.js
- define controller for user endpoints