import { pool } from "../../db";
import type { IUser } from "./user.interface";
import bcrypt from "bcrypt";
const createUserIntoDB = async (playload: IUser) => {
  const { name, email, password, age } = playload;

  const hashPassword = await bcrypt.hash(password, 10);


  const result = await pool.query(
    `
        INSERT INTO users (name, email, password, age)
        VALUES ($1, $2, $3, $4) RETURNING *;
        `,
    [name, email, hashPassword, age],
  );
delete result.rows[0].password
  return result;
};
const getAllUserFromDB = async () => {
  const result = await pool.query(`
        SELECT * FROM users
    `);

  return result;
};
const getSingleUserFromDB = async (id: string) => {
  const result = await pool.query(
    `
    
        SELECT * FROM users WHERE id=$1;
        
    `,
    [id],
  );

  return result;
};
const updateUserToDB = async (id: string, payload: Partial<IUser>) => {
  const { name, password, is_active, age } = payload;

  const result = await pool.query(
    `
    
        UPDATE users
        SET
        name = COALESCE($1, name),
        password = COALESCE($2, password),
        is_active = COALESCE($3, is_active),
        age = COALESCE($4, age),
        updated_at = NOW()
        WHERE id=$5 RETURNING *;
        
    `,
    [name ?? null, password ?? null, is_active ?? null, age ?? null, id],
  );

  return result;
};
const deleteUserToDB = async (id: string) => {
  const result = await pool.query(
    `
    
        DELETE FROM users
        WHERE id=$1;
        
    `,
    [id],
  );


  
  return result;
};

export const userService = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserToDB,
  deleteUserToDB,
};
