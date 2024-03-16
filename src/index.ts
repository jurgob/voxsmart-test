import {createServer} from './server'; 
// import { RandomService } from './randomService';
const port = 3000;
const app = createServer();
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});