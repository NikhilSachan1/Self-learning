import {client} from './redis-client';
async function getRedisData(keyName: string) {
    const result = await client.get(keyName);
    console.log(`Get Data of ${keyName}`, result); 
  }
  
  async function setRedisData(keyName: string, value: string) {
    console.log(`Set Data of ${keyName}`);
    const result = await client.set(keyName, value);
    console.log(result); 
    getRedisData(keyName);
  }
  
  async function expireByKeyName(keyName: string) {
    await client.expire(keyName, 10);
  }
  
  getRedisData('eureka:1');
  setRedisData('eureka:1', '1515515ighfgy15');
  expireByKeyName('eureka:1');