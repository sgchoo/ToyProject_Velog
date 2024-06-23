import { User } from "../../db/interfaces";

export type UserInfo = Pick<User, 'email' | 'password' | 'nickname'>;

export type LoginInfo = Pick<User, 'email' | 'password'>;

export type Payload = {
    id: string;
    email: string;
};

export type LoginOutput = {
    accessToken: string;
    refreshToken: string;
}