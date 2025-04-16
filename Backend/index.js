import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';

import authRoute from './Routes/authRoute.js';
import stackRoute from './Routes/stackRoute.js';
import actionRoute from './Routes/actionRoute.js';
import db from './Models/db.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
// app.use(bodyParser.json());
app.use(express.json()); 

app.use('/root', authRoute);
app.use('/stack', stackRoute);
app.use('/action', actionRoute);

app.listen(PORT, ()=>{
    console.log(`server is running on PORT ${PORT}`);
})