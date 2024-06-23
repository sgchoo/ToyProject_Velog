import { InternalServerException, UnauthorizedException } from "../../common/exception/exceptions";
import { findUserByEmail } from "../../db/db";
import { LoginInfo, LoginOutput, Payload, UserInfo } from "../dtos/types";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config'

export const userLogin = async (userInfo: LoginInfo): Promise<LoginOutput> => {
    try {
        const user = await findUserByEmail(userInfo);
    
        if(user == null)
            throw new UnauthorizedException('User Not Found');

        const isMatch = await bcrypt.compare(userInfo.password, user.password);

        if(!isMatch)
            throw new UnauthorizedException('Password is not match');
        else {
            const payload: Payload = {
                id: user.userId,
                email: user.email,
            }

            const secret: string = process.env.JWT_SECRET as string
            const accessToken = jwt.sign(payload, secret, {expiresIn: '1h'});
            const refreshToken = jwt.sign(payload, secret, {expiresIn: '60d'});

            const result: LoginOutput = {
                accessToken: accessToken,
                refreshToken: refreshToken,
            }

            return result;
        }
    }
    catch(err) {
        console.log(err)
        throw new InternalServerException('internal server err');
    }
}