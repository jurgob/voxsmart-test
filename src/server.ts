import express from 'express';
// import { startFetching, getAverage } from './randomService';

export const app = express();

app.get('/', (req, res) => {
//   const average = getAverage();
//   res.send(`Average: ${average}`);
const average = 5;
  res.send(`Average: ${average}`);
});



// app.listen(port, () => {
//   console.log(`Server is listening at http://localhost:${port}`);
// });
