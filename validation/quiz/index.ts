import { IsString, IsNotEmpty, IsNumber } from 'class-validator'
import { IsUnique } from 'classValidator'
import { Quiz } from 'model'

export class AddQuizValidation {
    @IsNotEmpty()
    @IsString()
    @IsUnique('name', Quiz)
    name?: string

    @IsNotEmpty()
    @IsNumber()
    @IsUnique('order', Quiz)
    order?: number
}

export class PatchQuizValidation {
    @IsNotEmpty()
    @IsString()
    name?: string

    @IsNotEmpty()
    @IsNumber()
    order?: number
}
