// const express = require('express');

import { userInfoExecute } from './db/db';
import { User, Board } from './db/interfaces';
import express, {Request, Response} from 'express';
import 'dotenv/config'

const app = express();
app.use(express.json());

app.listen(process.env.PORT);

app.get('/', (req: any, res: any) => {
    res.send('Hello!')
})

app.post('/signup', async (req: Request, res: Response) => {
    const user:User = req.body;

    if(!user.email || !user.password || !user.nickname)
    {
        res.status(400).send("req is wrong");
        return;
    }

    // 비밀번호 해시화

    const query = "INSERT INTO User (userId, email, password, nickname) VALUE (?, ?, ?, ?)";
    try {
        const success = await userInfoExecute(query, user);
        if(success)
            res.status(200).send("User Create");
        else 
            res.status(500).send("Internal Server Err");
    }
    catch(err) {
        console.log(err);
    }
})