import {
    IsString,
    MinLength,
    IsByteLength,
    IsOptional,
    IsNotEmpty,
    IsMobilePhone,
} from 'class-validator'
import { IsExists, IsUnique } from 'classValidator'
import { Admin, ForgotPassword, UserInfo } from 'model'
export class patchValidation {
    @IsOptional()
    @IsString()
    @IsUnique('username', Admin)
    @MinLength(5)
    username?: string

    @IsOptional()
    @IsString()
    @IsByteLength(8, 20)
    password?: string
}
export class ForgotPasswordValidation {
    @IsNotEmpty()
    @IsMobilePhone('fa-IR')
    @IsExists('parentPhoneNumber', UserInfo)
    phoneNumber!: string

    @IsNotEmpty()
    @IsString()
    @IsByteLength(8, 20)
    newPassword!: string
}
export class SendCodeForgotPasswordValidation {
    @IsNotEmpty()
    @IsMobilePhone('fa-IR')
    @IsExists('phoneNumber', ForgotPassword)
    phoneNumber!: string

    @IsNotEmpty()
    @IsString()
    code!: string
}
