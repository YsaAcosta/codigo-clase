import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "../services/auth.service";
export class AuthRoutes{
    static get routes():Router{
        const routes= Router();
        const authService = new AuthService();
        const controller = new AuthController(authService);
        
        // api/auth
        routes.post('/login',controller.login);
        routes.post('/register',controller.register);
        return routes;
    }
}