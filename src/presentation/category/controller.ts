import { Request, Response } from "express";
import { CreateCategoryDto } from "../../domain/dtos/category/create-category.dto";
import { CategoryService } from "../services/category.service";
import {Validators} from '../../config/validator'
import { UpdateCategoryDto } from "../../domain/dtos/category/update-category.dto";
import { PaginationDto } from "../../domain/dtos/category/paginationdto";

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  create = (req: Request, res: Response) => {
    const [error, createCategory] = CreateCategoryDto.create(req.body);
    if (error) return res.status(400).json({ error });
    this.categoryService.create(createCategory!)
    .then(category => res.json(category))
    .catch(error => res.status(500).json(error));
  };

  update = (req:Request, res:Response) => {
    const id = req.params.id
    if(!Validators.validationMongoId(id)) throw Error('mongo id is not valid')
    const [error, updateCategoryDto] = UpdateCategoryDto.update(req.body)
    if(error) return res.status(400).json({error})
    this.categoryService.update(updateCategoryDto!, id!)
    .then(category => res.json(category))
    .catch(error => res.status(500).json(error))
}

  delete = (req:Request, res:Response) => {
  const id = req.params.id
  if(!Validators.validationMongoId(id)) throw Error('mongo id is not valid')
  this.categoryService.delete(id!)
  .then(category => res.json(category))
  .catch(error => res.status(500).json(error))
}


  findAll = (req: Request, res: Response) => {
    const [error, paginationDto]=  PaginationDto.paginate( req.query );
    if(error) return res.status(400).json({error})
    this.categoryService.findAll( paginationDto! )
    .then(categories=> res.json(categories))
    .catch(error=> res.status(500).json({error}))
  };

  findOne = (req: Request, res: Response) => {
  const id = req.params.id
  if(!Validators.validationMongoId(id)) throw Error('mongo id is not valid')
    this.categoryService.findOne(id!)
    .then(category => res.json(category))
    .catch(error => res.status(500).json(error))  
  };
}
