# node-security-brown-bag
Scenarios for the brown bag session about secure node applications

## Setup
The following steps have been made to initialize the project:

```
npm install -g express-generator
cd node-security-brown-bag
express -f
yarn add sequelize@3.16 sqlite3
yarn add --dev sequelize-cli
node_modules/.bin/sequelize init
node_modules/.bin/sequelize model:create --name Task --attributes title:string
```

## API

```
# Reading all tasks
curl localhost:3000/tasks

# Creating a task
curl localhost:3000/tasks -d '{"title":"Some title"}'  -H 'content-type:application/json'
```
