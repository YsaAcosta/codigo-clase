import { Router } from "express";
import { ProductController } from "./controller";

export class ProductRoute{
    static get routes(): Router{
        const routes= Router();
        const controller = new ProductController();
        routes.get('/',controller.findAll);
        routes.get('/:id',controller.findOne);
        routes.post('/',controller.create);
        routes.delete('/:id',controller.delete);
        routes.put('/:id',controller.update);

        return routes;
    }
}