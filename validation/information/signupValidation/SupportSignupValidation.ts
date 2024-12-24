import {
    IsByteLength,
    IsMobilePhone,
    IsNotEmpty,
    IsString,
    MinLength,
} from 'class-validator'
import { IsUnique } from 'classValidator'
import { Admin } from 'model'

export class SupportSignupValidation {
    @IsNotEmpty()
    @IsString()
    @IsUnique('username', Admin)
    @MinLength(5)
    username!: string

    @IsNotEmpty()
    @IsString()
    @IsByteLength(8, 20)
    password!: string

    @IsNotEmpty()
    @IsString()
    name!: string

    @IsNotEmpty()
    @IsMobilePhone('fa-IR')
    phoneNumber!: string
}
