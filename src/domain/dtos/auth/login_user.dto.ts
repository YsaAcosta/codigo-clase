export class LoginDto {

    constructor(
        public email: string,
        public password: string,
    ) { }
    static create(object: { [key: string]: any }): [string?, LoginDto?] {

        const { email, password } = object;

        if (!email) return ['email is required ', undefined];
        if (!password) return ['password is required ', undefined];

        return [undefined, new LoginDto(email, password)]
    }
}