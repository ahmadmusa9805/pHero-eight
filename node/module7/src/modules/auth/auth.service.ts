import { pool } from "../../db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';




const loginUserDB = async (playload: any) => {
  const { email, password } = playload;

    const user = await pool.query(
    `
    SELECT * FROM users WHERE email=$1    
        `,
    [email],
  );
  //   console.log(user.rows[0]);
  if (user.rowCount === 0) {
    throw new Error("Invalid credentials!!");
  }

  const matchPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!matchPassword) {
    throw new Error("Invalid credentials!!");
  }

  //  console.log(user.rows[0].is_Active);
  if (!user.rows[0].is_active) {
    throw new Error("Access denied!!");
  }

  const payload = {
     email
  }

  const accessToken = jwt.sign(payload, "sdkgjfhdskfgjh",{
    expiresIn: "1d"
  })


//   const result = await pool.query(
//     `
//         INSERT INTO users (name, email, password, age)
//         VALUES ($1, $2, $3, $4) RETURNING *;
//         `,
//     [name, email, hashPassword, age],
//   );
// delete result.rows[0].password
  return {accessToken, user: user?.rows[0]};
};

export const authService = {
    loginUserDB
}