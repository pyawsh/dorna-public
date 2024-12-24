import { IsNotEmpty, IsString } from 'class-validator'

export class loginValidation {
    @IsNotEmpty()
    @IsString()
    username!: string

    @IsNotEmpty()
    @IsString()
    password!: string
}
