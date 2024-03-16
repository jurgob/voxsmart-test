import {createServer} from './server'; 
// import { RandomService } from './randomService';
const port = 3000;
const {app,stopApp} = createServer();

const server = app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

process.on('SIGINT', function() {
  console.log("Start server shutdown");
  stopApp();
  process.exit();
});