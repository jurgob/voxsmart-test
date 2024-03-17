import axios from 'axios';

const logger = require('pino')()


export type Client = {
  get: (url: string) => Promise<unknown>;
};

export async function gerCsrngRandomNumber(client:Client= axios): Promise<number|undefined> {
    const MIN = 0;
    const MAX = 100;
    try {
      const response  = await client.get(`https://csrng.net/csrng/csrng.php?min=${MIN}&max=${MAX}`) as {data: unknown};  
      const data =  response?.data ;
      if(Array.isArray(data) && data[0]  && typeof data[0].random === 'number'){
        const result:number = data[0].random;
        if(result < MIN || result > MAX){
          logger.error({result}, 'gerCsrngRandomNumber error unexpected number');
          return undefined;
        }
        logger.info({result}, 'gerCsrngRandomNumber result');
        return result;
      }else{
        logger.error({data, data_type: typeof data}, 'gerCsrngRandomNumber error wrong data format');
        return undefined;
      }
    }catch (error) {
      logger.error({error}, 'gerCsrngRandomNumber error');
      return undefined;
    }
  }