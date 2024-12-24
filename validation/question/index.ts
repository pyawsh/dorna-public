import {
    IsString,
    IsNotEmpty,
    ArrayMinSize,
    IsArray,
    IsEnum,
} from 'class-validator'
import { IsExists } from 'classValidator'
import { Level, Image } from 'model'

export class AddQuestionValidation {
    @IsNotEmpty()
    @IsExists('_id', Level)
    @IsString()
    levelId?: string

    @IsNotEmpty()
    @IsString()
    @IsEnum(['video', 'audio'])
    questionType?: string

    @IsNotEmpty()
    @IsString()
    questionPath?: string

    @IsNotEmpty()
    @IsString()
    @IsExists('path', Image)
    answerPath?: string

    @IsArray()
    @ArrayMinSize(1, {
        message: 'Other answers ID must contain exactly 1 elements.',
    })
    otherAnswersPath?: Array<string>
}
//
// export class PatchQuestionValidation {
//     @IsExists('audioId', Audio)
//     @IsString()
//     @IsOptional()
//     audioId?: string
//
//     @IsExists('videoId', Video)
//     @IsString()
//     @IsOptional()
//     videoId?: string
//
//     @IsExists('answerImageId', Image)
//     @IsNotEmpty()
//     @IsString()
//     answerImageId?: string
//
//     @IsArray()
//     @ArrayMinSize(3, {
//         message: 'Other image IDs must contain exactly 3 elements.',
//     })
//     @ArrayMaxSize(3, {
//         message: 'Other image IDs must contain exactly 3 elements.',
//     })
//     otherImageId?: any
// }
