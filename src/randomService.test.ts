import {  createRandomService} from './randomService';
import {gerCsrngRandomNumber} from './gerCsrngRandomNumber';
// import {fetchRandomNumber,getAverage} from './randomService';
import assert from 'assert';
import {  describe, beforeEach,afterEach,it, mock} from 'node:test';
import {mock as csjMock} from 'cjs-mock';


function mockRandomService( mockFn: typeof gerCsrngRandomNumber  ): {createRandomService: typeof createRandomService} {
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

describe('getAverage works mocking fetchRandomNumber()', async () => {;
    describe('getAverage works with no  fetchRandomNumber', async () => {
        const mockedFoo =mockRandomService(() => Promise.resolve(5)).createRandomService();
        const actual = mockedFoo.getAverage();
        assert.strictEqual(actual, 0);
    });
    describe('getAverage works with one fetchRandomNumber', async () => {
        const mockedFoo =mockRandomService(() => Promise.resolve(5)).createRandomService();
        await mockedFoo.fetchRandomNumber();
        const actual = mockedFoo.getAverage();
        assert.strictEqual(actual, 5);
    });

    describe('getAverage works with one 2 fetchRandomNumber ', async () => {
        const res = [Promise.resolve(2), Promise.resolve(10)]
        const mockedFoo =mockRandomService(mock.fn(buildMockRandomServiceFn(res))).createRandomService();
        
        await mockedFoo.fetchRandomNumber();
        await mockedFoo.fetchRandomNumber();
        const actual = mockedFoo.getAverage();
        assert.strictEqual(actual, 6);
    });

    describe('getAverage works with one 2 fetchRandomNumber successful and one failure ', async () => {
        const res = [Promise.resolve(2), Promise.reject("random error"),Promise.resolve(10)]
        const mockedFoo =mockRandomService(mock.fn(buildMockRandomServiceFn(res))).createRandomService();
        
        await mockedFoo.fetchRandomNumber();
        await mockedFoo.fetchRandomNumber();
        await mockedFoo.fetchRandomNumber();
        const actual = mockedFoo.getAverage();
        assert.strictEqual(actual, 6);
    });

})