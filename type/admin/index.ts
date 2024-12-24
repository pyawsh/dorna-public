import { Document, Model, Schema } from 'mongoose'

export type username = { username: string }
export type password = { password: string }
type id = { id: string }
type createdAt = { createdAt: Date }
type verification = { verification: boolean }
type phoneNumber = { phoneNumber: string }
type name = { name: string }
type adminIdType = { adminId: Schema.Types.ObjectId }

type nameAndPhonenumber = name & phoneNumber
export type userAndPass = username & password
type userAndId = username & id

//admin logged type
export type adminStateType = {
    adminInformation: userAndId & {
        adminType: 'root' | 'support' | 'user' | 'expert'
    }
}

//admin
export type AdminDocument = Document &
    username &
    createdAt & {
        hash: string
        salt: string
        adminType: 'root' | 'user' | 'expert' | 'support'
    }

export type AdminModel = Model<AdminDocument>

//user type
export type userType = {
    name: string
    parentPhoneNumber: string
    dateOfBirth: Date
    gender: 'male' | 'female'
    childNationalCode: number
    severityOfHearingLoss: 'mild' | 'average' | 'severe' | 'deep'
    typeOfHearingLoss: 'hearingAids' | 'cochlearImplantation' | 'both'
    cochlearImplantOrHearingAid: 'single' | 'pair'
    comorbidity:
        | 'attention deficit/hyperactivity disorder'
        | 'auditory processing disorder'
        | 'both'
    grade: 'prep' | 'elementary'
    centerName?: string
    foundation?: 'first' | 'second' | 'third' | 'fourth' | 'fifth' | 'sixth'
    schoolName?: string
    state: string
    city: string
    motherTongue: string
    registrationType: 'free' | 'center'
}
export type userSignupType = userAndPass & userType
export type userInformationStateType = {
    usersInformation: Array<
        userAndId & {
            userId: id & userType & verification
        }
    >
}

export type UserInfoDocument = Document &
    userType &
    adminIdType &
    verification &
    createdAt

export type UserInfoModel = Model<UserInfoDocument>

//support type
export type supportSignupType = userAndPass & nameAndPhonenumber

export type SupportInfoDocument = Document &
    nameAndPhonenumber &
    createdAt &
    adminIdType & { isActive: boolean }

export type SupportInfoModel = Model<SupportInfoDocument>

//expert type

export type expertType = nameAndPhonenumber &
    adminIdType & {
        isActive: boolean
        degree: string
    }
export type expertSignupType = userAndPass &
    nameAndPhonenumber & {
        degree: string
    }

export type ExpertInfoDocument = Document & expertType & createdAt

export type ExpertInfoModel = Model<ExpertInfoDocument>

export type ForgotPassword = {
    phoneNumber: string
    hashCode: string
    saltCode: string
    hash: string
    salt: string
    expireAt: Date
}
export type ForgotPasswordDocument = Document & ForgotPassword

export type ForgotPasswordModel = Model<ForgotPasswordDocument>
