import {Request, Response, NextFunction} from 'express'
import { JwtAdapter } from '../../config/jwt.adapter';
import { UserModel } from '../../database/mongodb/models/user.models';
export class AuthMiddleware{
static async validateJWT(req:Request, res:Response, next:NextFunction){
    const authorization= req.header("Authorization");

    if(!authorization) return res.status(400).json({error:'token not provided!'});
    if( !authorization.startsWith('Bearer ')) return res.status(400).json({error:'token not provided!'});
    
    const token = authorization.split(" ").at(1) || "";
    if( !token ) return res.status(400).json({error:'token not provided!'});
    
    const payload = await JwtAdapter.validateToken<{id:string}>( token );
    if(!payload) return res.status(400).json({error:'invalid token'});
    
    const user = await UserModel.findOne({_id:payload.id});
    if(!user) return res.status(400).json({error:'invalid token'});
    req.body.user = user;
    next();
}
}