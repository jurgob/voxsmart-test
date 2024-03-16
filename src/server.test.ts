import assert from 'assert';
import {  describe,beforeEach,afterEach, mock,it } from 'node:test';
import {createServer} from './server';   
import { AddressInfo } from 'node:net';
import { Server } from "http";
import axios from 'axios';



const buildMockRandomServiceFn = (res: Promise<number>[]) =>  function mockRandomServiceFn(){
    const result = res.shift();
    if(result){
        return result;
    }else {
        throw new Error('Wrong mock');
    }
};


async function createServerMock(){
    const {app, stopApp} = createServer();
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
        mock.timers.enable({ apis: ['setInterval'] });
    })

    afterEach(() => {
        mock.timers.reset();
    })

    it('return average of 0 at time 0', async () => {
        const {apiUrl, close} = await createServerMock();
        const response = await axios.get(`${apiUrl}/random`);
        
        assert.strictEqual(response.data.average, 0);
        close();
    });


    it('return average of 0 at 0.5 seconds', async () => {
        const {apiUrl, close} = await createServerMock();
        const response = await axios.get(`${apiUrl}/random`);
        
        assert.strictEqual(response.data.average, 0);
        close();
    });
    // createServer

    
});    
