import { Pool } from "pg";
import config from "../config";



export const pool = new Pool({
  connectionString: config.connection_string

});


export const initDB = async () => {
  try {
    await pool.query(`
        
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            is_active BOOLEAN DEFAULT true,
            age INT,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
           
);

        `);
    await pool.query(`
        
        CREATE TABLE IF NOT EXISTS profile (
            id SERIAL PRIMARY KEY,
            user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,

            bio TEXT,
            address TEXT,
            phone VARCHAR(15),
            gender VARCHAR(15),
          
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
);

        `);
    console.log("Connected to the database");
  } catch (err) {
    console.error("Error connecting to the database", err);
  }
};