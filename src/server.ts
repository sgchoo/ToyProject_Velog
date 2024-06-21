import express from 'express';

import 'dotenv/config'

import signupContrtoller from './User/signup/signup.controller';

const app = express();

app.use(express.json());

app.use('/', signupContrtoller);

app.listen(process.env.PORT, () => {
    console.log(`run server on http://localhost:${process.env.PORT}`);
});