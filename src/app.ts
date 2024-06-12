import dotenv from 'dotenv';
import authRoute from './routes/authRoute';


dotenv.config();


import express from 'express';

const app = express();

app.use(express.json());

app.use('/auth', authRoute)

console.log("Se esta ejecutando");


export default app;