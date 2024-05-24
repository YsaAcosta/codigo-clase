export class PaginationDto{
    constructor(
        public offset:number,
        public limit:number,
    ){}
  
    static paginate(object:{[key:string]:any}):[string?, PaginationDto?]{

        const { offset = 0, limit = 10 } = object

        if( isNaN(+offset) ) return ['offset debe ser un numero',undefined]
        if( isNaN(+limit) ) return ['limit debe ser un numero',undefined]
        if( +offset < 0 ) return ['offset must be greater than 0',undefined]
        if( +limit < 0) return ['limit must be greater than 0',undefined]

        return [undefined, new PaginationDto( +offset, +limit)]
    }
  }