import express, { Request, Response, NextFunction } from 'express';
import { LoginInfo, LoginOutput } from '../dtos/types';
import { userLogin } from './login.service';

const router = express.Router();

router.post("/login", async (req: Request, res: Response, next: NextFunction): Promise<LoginOutput | null> => {
    try {
        const info: LoginInfo = req.body as LoginInfo;
    
        return await userLogin(info);
    }
    catch(err) {
        next(err);
        return null;
    }
})

export default router;