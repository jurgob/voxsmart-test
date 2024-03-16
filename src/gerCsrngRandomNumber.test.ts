import assert from 'assert';
import {  describe } from 'node:test';
import {gerCsrngRandomNumber, Client} from "./gerCsrngRandomNumber";

describe('gerCsrngRandomNumber', async () => {
    describe('forward result if axios is successfull ', async () => {
        const mockClient:Client = {
            get: async (url: string) => Promise.resolve({
                data: [{random: 5}]
            })
        }
        const number = await gerCsrngRandomNumber(mockClient)
        assert.strictEqual(number, 5);
    })

    describe('forward result if axios is successfull and return 0', async () => {
        const mockClient:Client = {
            get: async (url: string) => Promise.resolve({
                data: [{random: 0}]
            })
        }
        const number = await gerCsrngRandomNumber(mockClient)
        assert.strictEqual(number, 0);
    })

    
    describe('gerCsrngRandomNumber return undefined on axios error/unexpected results  ', async () => {
        describe('return undefined with axios reject ', async () => {
            const mockClient:Client = {
                get: async (url: string) => Promise.reject(new Error('axios error'))
            }
            const number = await gerCsrngRandomNumber(mockClient)
            assert.strictEqual(number, undefined);
        })  
    
        describe('when axios returning non json  ', async () => {
            const mockClient:Client = {
                get: async (url: string) => Promise.resolve(`<html><body><p></p></body></html>`)
            }
            const number = await gerCsrngRandomNumber(mockClient)
            assert.strictEqual(number, undefined);
        })  
    
        describe('when axios returning non json in data  ', async () => {
            const mockClient:Client = {
                get: async (url: string) => Promise.resolve({data:`<html><body><p></p></body></html>` })
            }
            const number = await gerCsrngRandomNumber(mockClient)
            assert.strictEqual(number, undefined);
        }) 

        describe('when axios returning an empty data object', async () => {
            const mockClient:Client = {
                get: async (url: string) => Promise.resolve({data:{} })
            }
            const number = await gerCsrngRandomNumber(mockClient)
            assert.strictEqual(number, undefined);
        }) 

        describe('when axios returning non number in the expected "random" field', async () => {
            const mockClient:Client = {
                get: async (url: string) => Promise.resolve({data:{random: "notanumber"} })
            }
            const number = await gerCsrngRandomNumber(mockClient)
            assert.strictEqual(number, undefined);
        })  

        describe('when axios returning a number not in the expected range', async () => {
            const mockClient:Client = {
                get: async (url: string) => Promise.resolve({data:{random: 100000} })
            }
            const number = await gerCsrngRandomNumber(mockClient)
            assert.strictEqual(number, undefined);
        })  
    })

   

})
