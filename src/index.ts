import {createServer} from './server'; 
import {logger} from './logger';

// import { RandomService } from './randomService';
const port = 3000;
const {app,stopApp} = createServer();

const server = app.listen(port, () => {
  logger.info(`Server is listening at http://localhost:${port}`);
});

process.on('SIGINT', function() {
  logger.info("Start server shutdown");
  stopApp();
  process.exit();
});