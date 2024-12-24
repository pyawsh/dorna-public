import { IsString, IsOptional, IsNotEmpty, IsBoolean } from 'class-validator'
import { IsExists } from 'classValidator'
import { Accept, Word } from 'model'

export class acceptValidation {
    @IsNotEmpty()
    @IsString()
    @IsExists('_id', Word)
    wordId?: string

    @IsNotEmpty()
    @IsString()
    @IsExists('_id', Accept)
    acceptId?: string

    @IsString()
    @IsOptional()
    snr?: string

    @IsBoolean()
    @IsOptional()
    sound?: boolean
}
export class EditMediaValidation {
    @IsString()
    @IsOptional()
    snr?: string

    @IsBoolean()
    @IsOptional()
    sound?: boolean
}
