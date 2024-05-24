import { ROLES } from './../../domain/enums/role.enum';

import { UserEntity } from "../../domain/entities/user.entity";
import { LoginDto } from "../../domain/dtos/auth/login_user.dto";
import { UserModel } from "../../database/mongodb/models/user.models";
import { UserMaper } from "../../domain/mapers/user.mapers";
import { RegisterDto } from "../../domain/dtos/auth/register_user.dto";
import { JwtAdapter } from "../../config/jwt.adapter";

export class AuthService {
  async register(registerDto: RegisterDto): Promise<UserEntity> {
    const { name, email, password } = registerDto;
    try {
      const exist = await UserModel.findOne({email});
      if (exist) throw Error("error");
      
      const register = await UserModel.create( {
        ...registerDto,
        role: ROLES.USER,
      } );
      if (!register) throw Error("error");
      
      await register.save();
      
      return UserMaper.fromEntity( register );
    } catch (error) {
        throw error;
    }
}

async login(loginDto:LoginDto):Promise<{token:string,user:UserEntity}>{
  const { email , password} = loginDto;
    try {
      const user = await UserModel.findOne({ email });
      if(!user) throw Error('user not found')
      
      if(user.password !== password) throw Error('credencials not valid!');
      const token = await JwtAdapter.generateToken({id:user.id});
      if(!token) throw Error('Error')
      return{
      token,
      user:UserMaper.fromEntity(user),
      }

  } catch (error) {
      throw error; 
  }
}
}