import { Model } from 'mongoose'

export type VerificationCodeDocument = {
    phoneNumber: string
    hash: string
    salt: string
    expireAt: Date
}

export type VerificationCodeModel = Model<VerificationCodeDocument>
