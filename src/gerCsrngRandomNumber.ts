import axios from 'axios';


export async function gerCsrngRandomNumber(client= axios): Promise<number> {
    try {
      const response = await client.get<{ data: unknown }>('https://csrng.net/csrng/csrng.php?min=0&max=100');  
      const data = response?.data;
      if(Array.isArray(data) && data[0]  && typeof data[0].random === 'number'){
        const result:number = data[0].random;
        return result;
      }else{
        throw new Error('Invalid response');
      }
    }catch (error) {
      throw new Error('Invalid response');
    }
  }