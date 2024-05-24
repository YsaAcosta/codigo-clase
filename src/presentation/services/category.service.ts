import { promises } from "dns";
import { CreateCategoryDto } from "../../domain/dtos/category/create-category.dto";
import { CategoryEntity } from "../../domain/entities/category.entity";
import { CategoryModel } from "../../database/mongodb/models/category.model";
import { CategoryMaper } from "../../domain/mapers/category.mapers";
import { UpdateCategoryDto } from "../../domain/dtos/category/update-category.dto";
import {PaginationDto} from "../../domain/dtos/category/paginationdto"

interface FindAllCategories{
  offset:number, 
  limit:number, 
  page:number, 
  total:number, 
  categories:CategoryEntity[],
}

export class CategoryService {
  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    const {name}= createCategoryDto;
    try {
      const exist = await CategoryModel.findOne({ name });
      if (exist) throw Error("error");
      const Category = await CategoryModel.create(createCategoryDto);
      if (!Category) throw Error("error");
      await Category.save();
      return CategoryMaper.fromEntity(Category);
    } catch (error) {
        throw error;
    }
}

async update(updateCategoryDto:UpdateCategoryDto, id:string):Promise<CategoryEntity>{
  try {
      const category = await CategoryModel.findByIdAndUpdate({
          id: updateCategoryDto,
          data:{...updateCategoryDto}
      });
      if(!category) throw Error('Error')
      await category.save();
      return CategoryMaper.fromEntity(category);

  } catch (error) {
      throw error; 
  }
}

 
async delete(id:string):Promise<CategoryEntity>{
  try {
      const category = await CategoryModel.findOneAndDelete({id});
      if(!category) throw Error('Error')
      return CategoryMaper.fromEntity(category);

  } catch (error) {
      throw error; 
  }
}
async findOne(id:string):Promise<CategoryEntity>{
  try {
      const category = await CategoryModel.findOne({id});
      if(!category) throw Error('Error')
      return CategoryMaper.fromEntity(category);

  } catch (error) {
      throw error; 
  }
}
  async findAll(paginationDto:PaginationDto):Promise<FindAllCategories> {
    const { offset = 0, limit = 10 } = paginationDto
    try{

      const categories = await CategoryModel.find({})
      .skip(offset)
      .limit(limit)
      const total = await CategoryModel.find({}).countDocuments();

        
      const mappedCategories = categories.map(category => CategoryMaper.fromEntity(category));
      
      return {
        offset,
        limit,
        page: (offset<=0)?1:Math.ceil(offset/limit),
        total,
        categories: mappedCategories
      };

    }catch(error){
      throw error;
    }
    }
  }

