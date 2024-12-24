import { IsString, IsOptional, IsMobilePhone } from 'class-validator'
export class ExpertPatchValidation {
    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsString()
    degree?: string

    @IsOptional()
    @IsMobilePhone('fa-IR')
    phoneNumber?: string
}
