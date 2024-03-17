import assert from 'assert';
import {  describe,beforeEach,afterEach, mock,it } from 'node:test';
import axios from 'axios';

const apiUrl = 'http://localhost:3000';

describe('integration test: endpoint /random', async () => {
    it('return a property average which is a number', async () => {

        const response = await axios.get(`${apiUrl}/random`);

        assert.strictEqual(response.status, 200);
        assert.strictEqual(typeof response.data.average, "number");
    });

    
});    
