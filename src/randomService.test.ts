import {  createRandomService} from './randomService';
import assert from 'assert';
import {  describe, test } from 'node:test';


const buildMockRandomServiceFn = (res: Promise<number>[]) =>  function mockRandomServiceFn(){
    const result = res.shift();
    if(result){
        return result;
    }else {
        throw new Error('Wrong mock');
    }
};
describe('randomService - test fetch limiter', async () => {
    test('fetchRandomNumber is called once on 2 fetch in less then 1000ms ', async () => {
        let callCount = 0;
        let result = 0;
        const fn = () => {
            callCount++;
            return Promise.resolve(result+=5)
        };
        const mockedFoo =createRandomService(fn, true);
        
        await mockedFoo.fetchRandomNumber();
        await mockedFoo.fetchRandomNumber();
        const actual = mockedFoo.getAverage();

        assert.strictEqual(actual, 5);
        assert.strictEqual(callCount, 1, 'fetchRandomNumber should be called once');
    })

    test('fetchRandomNumber is called twiace on 2 fetch in less then 1000ms  and rater disabled', async () => {
        let callCount = 0;
        let result = 0;
        const fn = () => {
            callCount++;
            return Promise.resolve(result+=5)
        };
        const mockedFoo =createRandomService(fn, false);
        
        await mockedFoo.fetchRandomNumber();
        await mockedFoo.fetchRandomNumber();
        const actual = mockedFoo.getAverage();

        assert.strictEqual(actual, 7.5);
        assert.strictEqual(callCount, 2, 'fetchRandomNumber should be called twice');
    })

});


describe('randomService - getAverage works mocking fetchRandomNumber()', async () => {;
    test('getAverage works with no  fetchRandomNumber', async () => {
        const mockedFoo =createRandomService(() => Promise.reject('shold not call this'));
        const actual = mockedFoo.getAverage();
        assert.strictEqual(actual, 0);
    });
    test('getAverage works with one fetchRandomNumber', async () => {
        const mockedFoo =createRandomService(() => Promise.resolve(5));
        await mockedFoo.fetchRandomNumber();
        const actual = mockedFoo.getAverage();
        assert.strictEqual(actual, 5);
    });

    test('getAverage works with one 2 fetchRandomNumber ', async () => {
        const res = [Promise.resolve(2), Promise.resolve(10)]
        const mockCsrngrandomNumber = buildMockRandomServiceFn(res);
        const mockedFoo =createRandomService(mockCsrngrandomNumber);
        
        await mockedFoo.fetchRandomNumber();
        await mockedFoo.fetchRandomNumber();
        const actual = mockedFoo.getAverage();
        assert.strictEqual(actual, 6);
    });

    test('getAverage works with one 2 fetchRandomNumber successful and one failure ', async () => {
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