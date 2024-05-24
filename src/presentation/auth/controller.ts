import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { RegisterDto } from "../../domain/dtos/auth/register_user.dto";
import { LoginDto } from "../../domain/dtos/auth/login_user.dto";
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    register = (req: Request, res: Response) => {
      const [error, registerDto] = RegisterDto.create(req.body);
      if (error) return res.status(400).json({ error });
      
      this.authService.register(registerDto!)
      .then(user => res.json(user))
      .catch(error => res.status(500).json(error));
    };

    login = (req: Request, res: Response) => {
        const [error, loginDto] = LoginDto.create(req.body);
        if(error) return res.status(400).json({error});

          this.authService.login(loginDto!)
          .then(login => res.json(login))
          .catch(error => res.status(500).json(error))  
        };

}    