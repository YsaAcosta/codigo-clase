import { errorMonitor } from "events";
import { CategoryEntity } from "../entities/category.entity"
export class CategoryMaper{
static fromEntity(object:{[key:string]:any}):CategoryEntity{

    const{id,name,description}=object;
    if (!name) throw Error('error');
    return new CategoryEntity(id,name,description)

}

}