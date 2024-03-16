
import { gerCsrngRandomNumber as defaultGerCsrngRandomNumber } from './gerCsrngRandomNumber';
// type GerCsrngRandomNumber = typeof gerCsrngRandomNumber|undefined;
export function createRandomService(gerCsrngRandomNumber=defaultGerCsrngRandomNumber){
  let randomNumbers: number[] = [];
  let sum = 0;
  async function fetchRandomNumber() {
    try {
      const randomNumber = await gerCsrngRandomNumber();
      randomNumbers.push(randomNumber);
      sum += randomNumber;
    } catch (error) {
      console.error('Error fetching random number:', error);
    }
  }

  function startFetching() {
    setInterval(fetchRandomNumber, 1000);
  }

  function getAverage() {
    return randomNumbers.length === 0 ? 0 : sum / randomNumbers.length;
  }

  return { fetchRandomNumber, startFetching, getAverage };
}

export type RandomService = ReturnType<typeof createRandomService>;

