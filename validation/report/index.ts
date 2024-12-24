import { ArrayMinSize, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { IsExists } from 'classValidator'
import { Question, UserInfo, Image } from 'model'

export class AddReportValidation {
    @IsNotEmpty()
    answers!: Array<{
        questionId: string
        chosenPath: string
    }>

    @IsNotEmpty()
    @IsNumber()
    duration!: number
}
