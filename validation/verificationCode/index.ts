import { IsNotEmpty, IsMobilePhone, IsString } from 'class-validator'
import { IsExists, IsUnique } from 'classValidator'
import { VerificationCode, UserInfo } from 'model'
export class SendSMSValidation {
    @IsNotEmpty()
    @IsExists('parentPhoneNumber', UserInfo)
    @IsUnique('phoneNumber', VerificationCode)
    @IsMobilePhone('fa-IR')
    phoneNumber!: string
}

export class SendVerificationCodeValidation {
    @IsNotEmpty()
    @IsExists('phoneNumber', VerificationCode)
    @IsMobilePhone('fa-IR')
    @IsString()
    phoneNumber!: string

    @IsNotEmpty()
    @IsString()
    code!: string
}
