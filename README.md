[![codecov](https://codecov.io/gh/jurgob/voxsmart-test/graph/badge.svg?token=K5L1O7VQ0F)](https://codecov.io/gh/jurgob/voxsmart-test)

# README

check test coverage on codecov: https://app.codecov.io/gh/jurgob/voxsmart-test


## Install

### install node.js
install node v20.11.1 or if you are an nvm/fnm user run

```bash
cs voxsmart-test
nvm use # or run "fnm use"
```

## Test

### Run test

```bash
npm test
```

### Run single file

```bash 
 npm run test:file src/randomService.test.ts
 ```

or interractive way: 

```bash 
 npm run test:file:w src/randomService.test.ts
 ```

### Run single file with only

if you want to use `describe.only()` and `test.only()` remember you got to add only to all the describe/test of your current test like: 
```js
// notice I've added only to both the test and the parent describe
describe.only('group of test', ()=> {
    test.only('my test', ()=> {
        assert.strictEqual(true, true);
    })
})
```
then run: 

```bash 
 npm run test:file:only src/randomService.test.ts
 ```

or interractive way: 

```bash 
 npm run test:file:only:w src/randomService.test.ts
 ```


### Run all test / single test in watch mode

```bash
# run all test in watch mode
npm test:w

# run singe test in watch mode
npm run test:file:w src/randomService.test.ts
```

## Run the service

### run in dev mode

```bash
npm run dev
```

### run in prod mode: 

build first

```bash
npm run build
```

then run: 

```bash
npm start
```

## Run integration tests

in a terminal, run the service with: 

```bash
npm run dev
```

in another therminal run the integration with: 

```bash
npm run test:integration
```



## Logs

when the test are running the logs are written in a file. You may want to visualize them in a different terminal with: 

```sh
npm run dev:logs
```

you can clean logs with: 

```sh
npm run dev:logs:clean
```

## code coverate

after you have runned a set of tests (e.g. with `npm test`) run the command: 

```npm run coverage
```

after this, if you run "

```bash
npm run coverage:http
```
on open your browser on `http://127.0.0.1:8080`, you will be able to check the test locally

## Assumption/decision

### assumpion
1. regarding the api csrng.net throttle, id done the foolowing assumption: 
- I've assumed that I can't use redis (I think that's what "no need of persinstence means)"
- the app will run in a single process (no clustering enabled, it could make sense if nodejs is dockerized)
- I assume that one single instance is gonna run of this server , of if multiple once are gonna run, there will be no shared proxy (like squid)
- given the use case, I've implemented a rate limiter (so if multiple requests are done in the same 1s time windows, the first one is exectued the other ones got discharged). Queuee the requests (aka debouncing) does not make much sense in this case

2. I spend some time to setup the node.js npm script with some usefull shortcut for the test runner 
### coding style
- I've used module pattern design for creating object e.g. 

```js
function createModule(){
    const method1 = () => {}
    return {
        method1
    }
}
```
- I've used params of "modules" to implement DI + default. e.g.: 
```js
import axios from 'axios';

function createModule(client=axios){
    const method1 = async () => {
        client()
    }
    return {
        method1
    }
}
```

### testing strategy
- explicit mock with manual DI rather then magic
- there's an exeption for this on the server.test.ts in order to make it as much as near to an e2e possible
- I've used app.express(0) to spin up a dedicated http port per test. read more on https://casual-programming.com/exploring_utopian_testing_strategies_for_nodejs_rest_apis/







