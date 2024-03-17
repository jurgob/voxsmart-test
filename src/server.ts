import express from 'express';
import { createRandomService } from './randomService';
import { gerCsrngRandomNumber as defaultGerCsrngRandomNumber } from './gerCsrngRandomNumber';

export function createServer(gerCsrngRandomNumber=defaultGerCsrngRandomNumber){
    const randomService = createRandomService(() => gerCsrngRandomNumber(), true);
    const stopFetching = randomService.startFetching();
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

