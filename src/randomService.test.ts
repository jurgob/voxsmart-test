import {  fetchRandomNumber, startFetching, getAverage } from './randomService';
import {gerCsrngRandomNumber} from './gerCsrngRandomNumber';
// import {fetchRandomNumber,getAverage} from './randomService';
import assert from 'assert';
import {  describe, beforeEach,afterEach,it, mock} from 'node:test';
import {mock as csjMock} from 'cjs-mock';


function mockRandomService( mockFn: typeof gerCsrngRandomNumber  ):{
    fetchRandomNumber: typeof fetchRandomNumber,
    startFetching: typeof startFetching,
    getAverage: typeof getAverage
} {
    const res =  csjMock('./randomService', { //relative to example.js
        './gerCsrngRandomNumber': {
            gerCsrngRandomNumber: mockFn,
        } 
    });
    return res;
}

const buildMockRandomServiceFn = (res: Promise<number>[]) =>  function mockRandomServiceFn(){
    const result = res.shift();
    if(result){
        return result;
    }else {
        throw new Error('Wrong mock');
    }
};


describe('getAverage works with one fetchRandomNumber', async () => {
    const mockedFoo =mockRandomService(() => Promise.resolve(5));
    await mockedFoo.fetchRandomNumber();
    const actual = mockedFoo.getAverage();
    assert.strictEqual(actual, 5);
});

describe('getAverage works with one 2 fetchRandomNumber ', async () => {
    const res = [Promise.resolve(2), Promise.resolve(10)]
    const mockedFoo =mockRandomService(mock.fn(buildMockRandomServiceFn(res)));
    
    await mockedFoo.fetchRandomNumber();
    await mockedFoo.fetchRandomNumber();
    const actual = mockedFoo.getAverage();
    assert.strictEqual(actual, 6);
});

describe('getAverage works with one 2 fetchRandomNumber successful and one failure ', async () => {
    const res = [Promise.resolve(2), Promise.reject("random error"),Promise.resolve(10)]
    const mockedFoo =mockRandomService(mock.fn(buildMockRandomServiceFn(res)));
    
    await mockedFoo.fetchRandomNumber();
    await mockedFoo.fetchRandomNumber();
    await mockedFoo.fetchRandomNumber();
    const actual = mockedFoo.getAverage();
    assert.strictEqual(actual, 6);
});


// describe.skip('Random Number Service', () => {
//   beforeEach(() => {
//     mock.timers.enable({ apis: ['setTimeout'] });
//   });

//   afterEach(() => {
//     mock.timers.reset()
//     mock.reset();
//   });

//   it('should fetch random numbers every second', () => {
//     const axiosMock = require('axios');
//     axiosMock.get.mockResolvedValue({ data: [Math.random() * 100] });

//     startFetching();
//     mock.timers.tick(5000);
//     assert.strictEqual(axiosMock.get.callCount, 5);
//   });

//   it('should calculate average correctly', () => {
//     // const axiosMock = require('axios');
//     // axiosMock.get.mockResolvedValueOnce({ data: [10] });
//     // axiosMock.get.mockResolvedValueOnce({ data: [20] });

//     startFetching();
//     assert.strictEqual(getAverage(), 0); // Initial average
//     // advanceTimersByTime(2000); // Wait for two numbers
//     assert.strictEqual(getAverage(), 15); // Average of 10 and 20
//   });
// });