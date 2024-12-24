import {
    IsString,
    IsOptional,
    IsMobilePhone,
    IsDate,
    IsEnum,
    IsInt,
    IsEmpty,
} from 'class-validator'
export class UserPatchValidation {
    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsMobilePhone('fa-IR')
    parentPhoneNumber!: string

    @IsOptional()
    @IsDate()
    dateOfBirth!: Date

    @IsOptional()
    @IsEnum(['male', 'female'])
    gender!: string

    @IsOptional()
    @IsInt()
    childNationalCode!: number

    @IsOptional()
    @IsEnum(['mild', 'moderate', 'severe', 'profound'])
    severityOfHearingLoss!: string

    @IsOptional()
    @IsEnum(['sensorineural', 'conductive', 'mixed'])
    typeOfHearingLoss!: string

    @IsOptional()
    @IsEnum(['cochlear implant', 'hearing aid'])
    cochlearImplantOrHearingAid!: string

    @IsOptional()
    @IsString()
    comorbidity!: string

    @IsOptional()
    @IsString()
    grade!: string

    @IsOptional()
    @IsString()
    nameOfTheTrainingCenterOrSchool!: string

    @IsOptional()
    @IsString()
    motherTongue!: string

    @IsOptional()
    @IsEnum(['new', 'renewal'])
    registrationType!: string

    @IsEmpty()
    verification!: boolean
}
