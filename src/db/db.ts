import mysql from 'mysql2/promise';
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
        console.error(err);
        return false;
    }
};