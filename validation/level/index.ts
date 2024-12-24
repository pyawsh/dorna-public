import {
    IsString,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsEnum,
} from 'class-validator'
import { IsExists } from 'classValidator'
import { Quiz, Accept } from 'model'

export class AddLevelValidation {
    @IsNotEmpty()
    @IsString()
    @IsExists('_id', Quiz)
    quizId?: string

    @IsNotEmpty()
    @IsString()
    @IsEnum(['preExam', 'exam', 'lastExam'])
    levelType?: string

    @IsOptional()
    @IsNumber()
    order?: number

    @IsOptional()
    @IsString()
    title?: string

    @IsNumber()
    @IsOptional()
    scoreLimit?: number

    @IsString()
    @IsNotEmpty()
    @IsExists('_id', Accept)
    winVideoAcceptId?: string

    @IsString()
    @IsNotEmpty()
    @IsExists('_id', Accept)
    logoAcceptId?: string
}

export class PatchLevelValidation {
    @IsNotEmpty()
    @IsString()
    levelType?: string

    @IsOptional()
    @IsString()
    @IsExists('_id', Accept)
    logoAcceptId?: string

    @IsOptional()
    @IsString()
    @IsExists('_id', Accept)
    winVideoAcceptId?: string

    @IsOptional()
    @IsNumber()
    order?: number

    @IsOptional()
    @IsString()
    title?: string

    @IsNumber()
    @IsOptional()
    scoreLimit?: number
}
