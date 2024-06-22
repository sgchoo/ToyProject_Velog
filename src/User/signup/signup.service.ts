import { userInfoExecute, findUserByEmail } from '../../db/db';
import { User } from '../../db/interfaces';
import { SignupInfo } from './interfaces/interfaces';
import bcrypt from 'bcrypt';

export const userSignup = async (userInfo: SignupInfo ): Promise<boolean> => {
    const query = "INSERT INTO User (userId, email, password, nickname) VALUE (?, ?, ?, ?)";
    
    const newUser = userInfo as User;

    // 중복 검사
    const isExited = await findUserByEmail(newUser);

    if (isExited != null) {
        console.log("already exit email");
        return false;
    }
    // 비밀번호 해시화
    const saltRounds = 10;
    newUser.password = await bcrypt.hash(newUser.password, saltRounds);

    try {
        const success = await userInfoExecute(query, newUser);
        if(success)
            return true;
        else 
            return false;
    }
    catch(err) {
        console.log(err);
        return false;
    }
}