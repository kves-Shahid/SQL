
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST,         // 'localhost'
  user: process.env.DB_USER,         // 'lms_app'
  password: process.env.DB_PASSWORD, // 'Pias123@'
  database: process.env.DB_NAME,     // 'lms'
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
