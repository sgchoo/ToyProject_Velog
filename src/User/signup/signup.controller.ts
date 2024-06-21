import express, { Request, Response } from 'express';
import { SignupInfo } from './interfaces/interfaces';
import { userSignup } from './signup.service';

const router = express.Router();

router.post('/signup', async (req: Request, res: Response) => {
    const user:SignupInfo = req.body;

    if(!user.email || !user.password || !user.nickname)
    {
        res.status(400).send("req is wrong");
        return;
    }

    try {
        const result = await userSignup(user);
        if(result)
            res.status(200).send("Sign Up Success");
        else
            res.status(500).send("Internal Server Err");
    }
    catch(err) {
        console.log('err');
    }
})

export default router;