import dotenv from 'dotenv';
import authRoute from './routes/authRoute';
import userRoute from './routes/userRoute'

dotenv.config();


import express from 'express';

const app = express();

app.use(express.json());

app.use('/auth', authRoute)
app.use('/users', userRoute)

console.log("Se esta ejecutando");


export default app;