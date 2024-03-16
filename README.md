# README

## install

### set rigth node version. install node v20.11.1 or if you are an nvm/fnm user

```bash
cs voxsmart-test
nvm use 
```

## test

### run test

```bash
npm test
```


### run single file

```bash 
 npm run test:file src/randomService.test.ts
 ```


## run all test / single test in watch mode

```bash
# run all test in watch mode
npm test:w

# run singe test in watch mode
npm run test:file:w src/randomService.test.ts
```

## run

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


## assumption/decision

### assumpion
1. regarding the api csrng.net throttle, id done the foolowing assumption: 
- I've assumed that I can't use redis (I think that's what "no need of persinstence means)"
- the app will run in a single process (no clustering enabled, it could make sense if nodejs is dockerized)
- I assume that one single instance is gonna run of this server , of if multiple once are gonna run, there will be no shared proxy (like squid)


### code style
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
- I use app.express(0) to spin up a dedicated http port per test. read more on https://casual-programming.com/exploring_utopian_testing_strategies_for_nodejs_rest_apis/





