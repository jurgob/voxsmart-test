
import { gerCsrngRandomNumber as defaultGerCsrngRandomNumber } from './gerCsrngRandomNumber';
// import {setInterval, clearInterval} from 'node:timers';
export function createRandomService(gerCsrngRandomNumber=defaultGerCsrngRandomNumber, fetchRatelimit:boolean = false){
  let randomNumbers: number[] = [];
  let sum = 0;

  let lastExecutionTime = 0;
  let timeWindow = 1000;

  async function fetchRandomNumber() {
    const currentTime = Date.now();
    if (fetchRatelimit && (currentTime - lastExecutionTime < timeWindow))
      return;
    
    lastExecutionTime = currentTime;

    const randomNumber = await gerCsrngRandomNumber().catch(() => undefined);
    if(typeof randomNumber === 'number'){
      randomNumbers.push(randomNumber);
      sum += randomNumber;
    }

  }

  function startFetching() {
    const intervalId = setInterval(() => fetchRandomNumber(), 1000);
    return function stopFetching() {
      clearInterval(intervalId);
    }
  }

  function getAverage() {
    return randomNumbers.length === 0 ? 0 : sum / randomNumbers.length;
  }

  return { fetchRandomNumber, startFetching, getAverage };
}

export type RandomService = ReturnType<typeof createRandomService>;

