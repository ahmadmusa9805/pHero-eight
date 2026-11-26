import type { Request, Response } from "express";
import { userService } from "./user.service";


const createUser = async (req: Request, res: Response) => {
     try{
    const body = req.body;
 
    const result = await userService.createUserIntoDB(body)

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
 }
const getAllUser = async(req: Request, res: Response)=>{
try {

    const result = await userService.getAllUserFromDB()
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
}
const getSingleUser = async(req: Request, res: Response)=>{
try {
    const id = req.params.id;
    console.log("id", id)
    const result = await userService.getSingleUserFromDB(id as string)
   
     if(result.rowCount === 0){
    res.status(404).json({
    success: false,
    message: "User Not Found",
    // data: result?.rows[0],
  });
   }
   
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
}
const updateUser = async(req: Request, res: Response)=>{
try {
    const id = req.params.id;
    const body = req.body;
    
    const result = await userService.updateUserToDB(id as string, body)
    
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
}
const deleteUser = async(req: Request, res: Response)=>{
try {
    const id = req.params.id;
    console.log("id", id)
    const result = await userService.deleteUserToDB(id as string)

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
}

 export const userController = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser
 } 