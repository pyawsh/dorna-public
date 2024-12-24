import { IsString, IsOptional, IsMobilePhone } from 'class-validator'
export class SupportPatchValidation {
    @IsOptional()
    @IsString()
    name!: string

    @IsOptional()
    @IsMobilePhone('fa-IR')
    phoneNumber!: string
}
