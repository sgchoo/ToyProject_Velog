import express, { Request, Response, NextFunction } from 'express';
import { LoginInfo, LoginOutput } from '../dtos/types';
import { userLogin } from './login.service';

const router = express.Router();

router.post("/login", async (req: Request, res: Response): Promise<LoginOutput> => {
    const info: LoginInfo = req.body as LoginInfo;

    return await userLogin(info);
})

export default router;