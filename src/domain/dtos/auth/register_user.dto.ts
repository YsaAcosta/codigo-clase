export class RegisterDto {

    constructor(
        public name: string,
        public email: string,
        public password: string,
    ) { }
    static create(object: { [key: string]: any }): [string?, RegisterDto?] {

        const { email, password, name } = object;

        if (!email) return ['email is required ', undefined];
        if (!password) return ['password is required ', undefined];
        if (!name) return ['name is required ', undefined];

        return [undefined, new RegisterDto(name, email, password)]

    }
}