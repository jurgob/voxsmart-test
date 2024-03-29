import assert from 'assert';
import {  describe,beforeEach,afterEach, mock,it } from 'node:test';
import {createServer} from './server';   
import { AddressInfo } from 'node:net';
import axios from 'axios';
import { gerCsrngRandomNumber} from './gerCsrngRandomNumber';



const buildMockRandomServiceFn = (res: Promise<number>[]) =>  function mockRandomServiceFn(){
    
    const result = res.shift();
    if(result){
        return result;
    }else {
        throw new Error('Wrong mock');
    }
};

type Mock = typeof gerCsrngRandomNumber

async function createServerMock(gerCsrngRandomNumber: Mock){
    const {app, stopApp} = createServer(gerCsrngRandomNumber);
    const server = app.listen(0); // this will open the server on a random ephimeral port
    const address = server.address() as AddressInfo;
    server.on('close', () => {
        stopApp();
        app.emit('close');
    });
    
    const apiUrl = `http://localhost:${address.port}`
    const close = () => {
        server.close();
    }

    return {server,apiUrl, close};
}

describe('endpoint /random', async () => {
    
    beforeEach(() => {  
        mock.timers.enable({ apis: ['setInterval', 'Date'] });
    })

    afterEach(() => {
        mock.timers.reset();
    })

    it('return average of 0 at time 0', async () => {
        const randomResults = [Promise.resolve(50)]

        const {apiUrl, close} = await createServerMock(buildMockRandomServiceFn(randomResults));
        const response = await axios.get(`${apiUrl}/random`);
        
        assert.strictEqual(response.data.average, 0);
        close();
    });

    it('return average of 0 after 1 tick with results [0]', async () => {
        const randomResults = [Promise.resolve(0)]

        const {apiUrl, close} = await createServerMock(buildMockRandomServiceFn(randomResults));
        mock.timers.tick(1001);
        const response = await axios.get(`${apiUrl}/random`);
        
        assert.strictEqual(response.data.average, 0);
        close();
    });

    it('return average of 50 after 1 tick with results [50]', async () => {
        const randomResults = [Promise.resolve(50)]

        const {apiUrl, close} = await createServerMock(buildMockRandomServiceFn(randomResults));
        mock.timers.tick(1001);
        const response = await axios.get(`${apiUrl}/random`);
        
        assert.strictEqual(response.data.average, 50);
        close();
    });

    it('return average of 75 after 2 tick with results [50, 100]', async () => {
        const randomResults = [Promise.resolve(50), Promise.resolve(100)]
        const {apiUrl, close} = await createServerMock(buildMockRandomServiceFn(randomResults));
        mock.timers.tick(1000);
        mock.timers.tick(1000);
        const response = await axios.get(`${apiUrl}/random`);     
        assert.strictEqual(response.data.average, 75);
        close();
    });

    it('return average of 50 after 1.5 tick with results [50, 100]', async () => {
        const randomResults = [Promise.resolve(50), Promise.resolve(100)]
        const {apiUrl, close} = await createServerMock(buildMockRandomServiceFn(randomResults));
        mock.timers.tick(1000);
        mock.timers.tick(500);
        const response = await axios.get(`${apiUrl}/random`);     
        assert.strictEqual(response.data.average, 50);
        close();
    });


    
});    
