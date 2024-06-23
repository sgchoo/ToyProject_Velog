import express, { Request, Response, NextFunction } from 'express';

import 'dotenv/config'

import signupContrtoller from './User/signup/signup.controller';
import loginController from './User/login/login.controller';
import { InternalServerException, UnauthorizedException } from './common/exception/exceptions';

const app = express();

app.use(express.json());

app.use('/', signupContrtoller);
app.use('/', loginController);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err); // 에러 로깅
    if (err instanceof UnauthorizedException) {
        res.status(401).json({ message: err.message });
    } else if (err instanceof InternalServerException) {
        res.status(500).json({ message: err.message });
    } else {
        res.status(500).json({ message: "An unexpected error occurred" });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`run server on http://localhost:${process.env.PORT}`);
});