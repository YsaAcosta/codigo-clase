import { Request, Response } from "express";

export class ProductController{
    create = (req:Request,res:Response)=>{
        return res.json({message:"product create"});
            }

            update = (req:Request,res:Response)=>{
                return res.json({message:"product create"});
                
            }     
            
            delete = (req:Request,res:Response)=>{
                return res.json({message:"product create"});
                
            }

            findAll = (req:Request,res:Response)=>{
                return res.json({message:"product create"});
                
            }

            findOne = (req:Request,res:Response)=>{
                return res.json({message:"product create"});
            }
}