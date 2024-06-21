import { userInfoExecute } from '../../db/db';
import { User } from '../../db/interfaces';
import { SignupInfo } from './interfaces/interfaces';

export const userSignup = async (userInfo: SignupInfo ): Promise<boolean> => {
    const query = "INSERT INTO User (userId, email, password, nickname) VALUE (?, ?, ?, ?)";
    
    const newUser = userInfo as User;

    // 중복 검사

    // 비밀번호 해시화

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