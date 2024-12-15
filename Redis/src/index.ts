import {client} from './redis-client';
import express, { Request, Response } from "express";
import axios from "axios";
const app = express();

app.get("/", async (req: Request, res: Response): Promise<any> => {

  const cacheValue = await client.get('todos');
  if(cacheValue) {
    return res.json(JSON.parse(cacheValue));
  }
  const { data } = await axios.get("https://jsonplaceholder.typicode.com/todos/");
  await client.set('todos', JSON.stringify(data));
  await client.expire('todos', 5);
  return res.json(data);
});

app.listen(9000);
