"use server" // This forces the file to stay on the server
import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL!;
export const sql = neon(databaseUrl);
