import { Model, Schema, Document } from 'mongoose'

export type AnswerMessages = {
    adminId: Schema.Types.ObjectId
    messageId: Schema.Types.ObjectId
    answer: string
    createdAt: Date
}

export type AnswerMessagesDocument = Document & AnswerMessages

export type AnswerMessagesModel = Model<AnswerMessagesDocument>

export type AnswerMessagesStateType = {
    answerMessages: Array<AnswerMessages>
}
