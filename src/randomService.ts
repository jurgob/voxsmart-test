
import { gerCsrngRandomNumber } from './gerCsrngRandomNumber';

let randomNumbers: number[] = [];
let sum = 0;

export async function fetchRandomNumber() {
  try {
    
    const randomNumber = await gerCsrngRandomNumber();
    console.log('--- randomNumber:', randomNumber);
    // const randomNumber = Math.random() * 100;
    randomNumbers.push(randomNumber);
    sum += randomNumber;
  } catch (error) {
    console.error('Error fetching random number:', error);
  }
}

export function startFetching() {
  setInterval(fetchRandomNumber, 1000);
}

export function getAverage() {
  return randomNumbers.length === 0 ? 0 : sum / randomNumbers.length;
}
