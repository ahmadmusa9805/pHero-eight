import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Pool } from "pg";
import config from "./config";
const app: Application = express();
    // "postgresql://neondb_owner:npg_qpcQ4kxjZ2CM@ep-dark-pine-biluzqzb.c-5.ap-southeast-1.aws.neon.tech/neondb?sslmode=false&channel_binding=require",
  // connectionString: "postgresql://neondb_owner:npg_qpcQ4kxjZ2CM@ep-dark-pine-biluzqzb-pooler.c-5.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

const pool = new Pool({
  connectionString: config.connection_string

});

app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// console.log("Connecting to the database...", pool);

const initDB = async () => {
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
    console.log("Connected to the database");
  } catch (err) {
    console.error("Error connecting to the database", err);
  }
};

initDB();

app.post("/api/v1/users", async (req: Request, res: Response) => {
     try{
    const body = req.body;
    const {name, email, password, age} = body;

    const result = await pool.query(`
        INSERT INTO users (name, email, password, age)
        VALUES ($1, $2, $3, $4) RETURNING *;
        `, [name, email, password, age])

    res.status(201).json({
    success: true,
    message: "User Created Successfully",
    data: result?.rows[0],
  });
  }catch(error: any){
    res.status(500).json({
    success: false,
    message: error?.message,
    data: error,
  })
}
 });

app.get("/api/v1/users", async(req: Request, res: Response)=>{
try {
    // const {id} = req.params;
    const result = await pool.query(`
    
        SELECT * FROM users;
        
    `)
        res.status(200).json({
    success: true,
    message: "User Retrieved Successfully",
    data: result?.rows,
  });

} catch (error:any) {
     res.status(500).json({
    success: false,
    message: error?.message,
    data: error,
  })
}
})
app.get("/api/v1/users/:id", async(req: Request, res: Response)=>{
try {
    const id = req.params.id;
    console.log("id", id)
    const result = await pool.query(`
    
        SELECT * FROM users WHERE id=$1;
        
    `,[id])
        res.status(200).json({
    success: true,
    message: "User Retrieved Successfully",
    data: result?.rows[0],
  });

} catch (error:any) {
     res.status(500).json({
    success: false,
    message: error?.message,
    data: error,
  })
}
})
app.put("/api/v1/users/:id", async(req: Request, res: Response)=>{
try {
    const id = req.params.id;
    const body = req.body;
    const {name, password, is_active, age } = body;
    console.log("id", id)
    const result = await pool.query(`
    
        UPDATE users
        SET
        name = COALESCE($1, name),
        password = COALESCE($2, password),
        is_active = COALESCE($3, is_active),
        age = COALESCE($4, age),
        updated_at = NOW()
        WHERE id=$5 RETURNING *;
        
    `,[name ?? null, password ?? null,  is_active ?? null, age ?? null, id])
    
    res.status(200).json({
    success: true,
    message: "User Updated Successfully",
    data: result?.rows[0],
  });

} catch (error:any) {
     res.status(500).json({
    success: false,
    message: error?.message,
    data: error,
  })
}
})
app.delete("/api/v1/users/:id", async(req: Request, res: Response)=>{
try {
    const id = req.params.id;
    console.log("id", id)
    const result = await pool.query(`
    
        DELETE FROM users
        WHERE id=$1;
        
    `,[id])
    
   if(result.rowCount === 0){
        res.status(404).json({
    success: false,
    message: "User Not Found",
    // data: result?.rows[0],
  });
   }

    res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
    // data: result?.rows[0],
  });

} catch (error:any) {
     res.status(500).json({
    success: false,
    message: error?.message,
    data: error,
  })
}
})

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    author: "PH",
  });
});

// app.post("/", (req: Request, res: Response) => {
//   console.log(req.body);

//   res.status(200).json({
//     success: true,
//     message: "Server is running",
//     author: "PH",
//   });
// });

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
