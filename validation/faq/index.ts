import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class AddFAQValidation {
    @IsString()
    @IsNotEmpty()
    question!: string

    @IsString()
    @IsNotEmpty()
    answer!: string
}
export class PatchFAQValidation {
    @IsString()
    @IsOptional()
    question?: string

    @IsString()
    @IsOptional()
    answer?: string
}
