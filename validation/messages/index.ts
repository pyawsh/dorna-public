import {
    IsBoolean,
    IsNotEmpty,
    IsOptional,
    IsString,
    Length,
} from 'class-validator'
import { IsExists } from 'classValidator'
import { UserInfo, Messages } from 'model'

export class AddMessagesValidation {
    @IsString()
    @IsNotEmpty()
    subject!: string

    @IsString()
    @Length(1, 100)
    description!: string
}
export class PatchMessagesValidation {
    @IsNotEmpty()
    @IsExists('_id', Messages)
    messageId!: string

    @IsBoolean()
    @IsOptional()
    read?: boolean

    @IsBoolean()
    @IsOptional()
    sentToCartable?: boolean
}
