import express from 'express';
import { createRandomService } from './randomService';

export function createServer(){
    const randomService = createRandomService();
    const stopFetching = randomService.startFetching();
    // randomService.startFetching();
    const app = express();

    app.get('/random', (req, res) => {
        const average = randomService.getAverage();
        res.json({average});
    });

    function stopApp(){
        stopFetching();
        app.emit('close');


    }

    return {app,stopApp };
}

