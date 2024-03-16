import {  createRandomService} from './randomService';
import assert from 'assert';
import {  describe } from 'node:test';


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
        const mockedFoo =createRandomService(() => Promise.reject('shold not call this'));
        const actual = mockedFoo.getAverage();
        assert.strictEqual(actual, 0);
    });
    describe('getAverage works with one fetchRandomNumber', async () => {
        const mockedFoo =createRandomService(() => Promise.resolve(5));
        await mockedFoo.fetchRandomNumber();
        const actual = mockedFoo.getAverage();
        assert.strictEqual(actual, 5);
    });

    describe('getAverage works with one 2 fetchRandomNumber ', async () => {
        const res = [Promise.resolve(2), Promise.resolve(10)]
        const mockCsrngrandomNumber = buildMockRandomServiceFn(res);
        const mockedFoo =createRandomService(mockCsrngrandomNumber);
        
        await mockedFoo.fetchRandomNumber();
        await mockedFoo.fetchRandomNumber();
        const actual = mockedFoo.getAverage();
        assert.strictEqual(actual, 6);
    });

    describe('getAverage works with one 2 fetchRandomNumber successful and one failure ', async () => {
        const res = [Promise.resolve(2), Promise.reject("random error"),Promise.resolve(10)]
        const mockCsrngrandomNumber = buildMockRandomServiceFn(res);
        const mockedFoo =createRandomService(mockCsrngrandomNumber);
        
        await mockedFoo.fetchRandomNumber();
        await mockedFoo.fetchRandomNumber();
        await mockedFoo.fetchRandomNumber();
        const actual = mockedFoo.getAverage();
        assert.strictEqual(actual, 6);
    });

})