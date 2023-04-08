### Dependencies Required

1. dotenv
2. express
3. mongoose
4. handlebars
5. bcryptjs
6. jsonwebtoken
7. morgon & winston
8. express-async-handler
9. winston-daily-rotate
10. cookie-parser
11. express-rate-limit
12. chalk
13. nodemon

### Generating hex strings for username and password

Run 'node' in terminal and use the below code:

> require("crypto").randomBytes(10).toString("hex")

Change the randomBytes as per the requirement.

### Check environment variables are loaded in dockercompose file

> docker compose -f local.yml config

### Starting the docker container

> docker compose -f local.yml up --build -d --remove-orphans

**-f local.yml**: This specifies the location of the Compose file to use, in this case, it's local.yml.
**up**: This command starts the containers defined in the Compose file.
**--build**: This option forces Docker to rebuild the images if any changes have been made since the last build.
**-d**: This flag detaches the containers from the terminal and runs them in the background.
**--remove-orphans**: This option removes any containers that are not defined in the Compose file.

### Check the logs from a docker container service

> docker compose -f local.yml logs api
