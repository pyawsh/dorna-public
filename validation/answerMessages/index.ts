import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { IsExists } from '../../classValidator'
import { Admin, AnswerMessages, Messages } from 'model'

export class AddAnswerMessagesValidation {
    @IsNotEmpty()
    @IsExists('_id', Messages)
    @IsString()
    messageId!: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    answer!: string
}
export class PatchAnswerMessagesValidation {
    @IsNotEmpty()
    @IsExists('_id', AnswerMessages)
    @IsString()
    id!: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    answer!: string
}
