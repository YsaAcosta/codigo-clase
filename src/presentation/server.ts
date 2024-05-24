import express from "express";
import { AppRoute } from "./routes"
import { envs } from "../config/envs";
export class Server{
    private app = express();

    public start(){

        //Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use( AppRoute.routes );

        //Listener ports
        this.app.listen(envs.PORT, ()=>{
            console.log(`Server running on port ${envs.PORT}`);
        })
    }
}