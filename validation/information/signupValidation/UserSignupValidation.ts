import {
    IsByteLength,
    IsDate,
    IsEmpty,
    IsEnum,
    IsMobilePhone,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator'
import { IsUnique } from 'classValidator'
import { Admin, UserInfo } from 'model'

export class UserSignupValidation {
    @IsNotEmpty()
    @IsString()
    @IsUnique('username', Admin)
    @MinLength(5)
    username!: string

    @IsNotEmpty()
    @IsString()
    @IsByteLength(8, 20)
    password!: string

    @IsNotEmpty()
    @IsString()
    name!: string

    @IsNotEmpty()
    @IsMobilePhone('fa-IR')
    @IsUnique('parentPhoneNumber', UserInfo)
    parentPhoneNumber!: string

    @IsNotEmpty()
    @IsDate()
    dateOfBirth!: Date

    @IsNotEmpty()
    @IsEnum(['male', 'female'])
    gender!: 'male' | 'female'

    @IsNotEmpty()
    @IsNumber()
    childNationalCode!: number

    @IsNotEmpty()
    @IsEnum(['mild', 'average', 'severe', 'deep'])
    severityOfHearingLoss!: 'mild' | 'average' | 'severe' | 'deep'

    @IsNotEmpty()
    @IsEnum(['hearingAids', 'cochlearImplantation', 'both'])
    typeOfHearingLoss!: 'hearingAids' | 'cochlearImplantation' | 'both'

    @IsNotEmpty()
    @IsEnum(['single', 'pair'])
    cochlearImplantOrHearingAid!: 'single' | 'pair'

    @IsNotEmpty()
    @IsString()
    comorbidity!: string

    @IsNotEmpty()
    @IsString()
    @IsEnum(['prep', 'elementary'])
    grade!: 'prep' | 'elementary'

    @IsOptional()
    centerName?: string

    @IsOptional()
    @IsEnum(['first', 'second', 'third', 'fourth', 'fifth', 'sixth'])
    foundation?: 'first' | 'second' | 'third' | 'fourth' | 'fifth' | 'sixth'

    @IsOptional()
    schoolName?: string

    @IsNotEmpty()
    @IsString()
    state!: string

    @IsNotEmpty()
    @IsString()
    city!: string

    @IsNotEmpty()
    @IsString()
    motherTongue!: string

    @IsNotEmpty()
    @IsEnum(['free', 'center'])
    registrationType!: 'free' | 'center'

    @IsEmpty()
    verification!: boolean
}
