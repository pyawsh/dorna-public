import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class AddScoreValidation {
    @IsNotEmpty()
    @IsNumber()
    correctAnswers!: number

    @IsNotEmpty()
    @IsNumber()
    wrongAnswers!: number
}
