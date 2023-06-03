# Shared To-do
A college project to exercise development and deployment of a real application


## Some questions
- If we define a CMD in a container that starts a server, started the container and failed, then added more dependencies so this command can work, how does the container install the dependencies if the install command is defined in lower layers of the dockerfile? how do we fix this failure when we have no access to the container?

## TODO 
- [x] Expose port from container 
- [x] Create container for DB
- [x] Make files editable from outside of container (--user 1000:1000)
- [] Make the same as above with docker-compose
- [] Research on security of above
- [x] Set run dev command
- [x] Install orm
- [] Create first table (Tasks)
- [] Move logic to DB
- [] Move logic to DB
- [] Create Users table
- [] Create authorization logic
- [] Create authentication logic