import express, { Request, Response } from 'express';
import { UserInfo } from '../dtos/types';
import { userSignup } from './signup.service';
import { UnauthorizedException } from '../../common/exception/exceptions';

const router = express.Router();

router.post('/signup', async (req: Request, res: Response) => {
    const user:UserInfo = req.body;

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
            throw new UnauthorizedException('Info already exited');
    }
    catch(err) {
        console.log('err');
    }
})

export default router;