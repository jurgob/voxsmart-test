
import { gerCsrngRandomNumber as defaultGerCsrngRandomNumber } from './gerCsrngRandomNumber';
// type GerCsrngRandomNumber = typeof gerCsrngRandomNumber|undefined;
export function createRandomService(gerCsrngRandomNumber=defaultGerCsrngRandomNumber){
  let randomNumbers: number[] = [];
  let sum = 0;
  async function fetchRandomNumber() {
      const randomNumber = await gerCsrngRandomNumber().catch(() => undefined);
      if(typeof randomNumber === 'number'){
        randomNumbers.push(randomNumber);
        sum += randomNumber;
      }
  }

  function startFetching() {
    const intervalId = setInterval(fetchRandomNumber, 1000);
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

