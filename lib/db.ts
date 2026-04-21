"use server" 

//connection with databse 
import { neon } from '@neondatabase/serverless';
const databaseUrl = process.env.DATABASE_URL!;
export const sql = neon(databaseUrl);
