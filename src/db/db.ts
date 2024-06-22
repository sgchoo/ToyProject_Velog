import mysql, { FieldPacket, RowDataPacket } from 'mysql2/promise';
import 'dotenv/config';
import {User, Board} from './interfaces';
import { randomUUID } from 'crypto';
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env || 'ERROR';

const pool = mysql.createPool({
    connectionLimit: 10,
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    waitForConnections: true,
})

export const userInfoExecute = async (query: string, params: User): Promise<boolean> => {
    try {
        const uuid = randomUUID();
        await pool.execute(query, [uuid, params.email, params.password, params.nickname]);
        return true;
    } catch (err) {
        throw new Error(`DB Execute Failed: ${err}`);
    }
};

export const findUserByEmail = async (param: Partial<User>): Promise<User | null> => {
    try {
        const query = "SELECT email FROM User WHERE email = ?";
        const [results, fields]: [RowDataPacket[], FieldPacket[]] = await pool.execute<RowDataPacket[]>(query, [param.email]);

        if(results.length > 0)
            return results[0] as User;
        else
            return null; 

    }
    catch(err) {
        throw new Error(`DB Find Failed: ${err}`);
    }
}