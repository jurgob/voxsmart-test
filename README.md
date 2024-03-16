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



