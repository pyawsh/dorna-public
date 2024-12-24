import { IsString, IsNotEmpty } from 'class-validator'
import { IsUnique } from 'classValidator'
import { Word } from 'model'

export class addWordValidation {
    @IsNotEmpty()
    @IsString()
    @IsUnique('word', Word)
    word?: string
}
