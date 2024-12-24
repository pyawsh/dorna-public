import { Model, Schema, Document } from 'mongoose'

export type Answers = {
    id: Schema.Types.ObjectId
    reportId: Schema.Types.ObjectId
    questionId: Schema.Types.ObjectId
    chosenWord: string
}
export type AnswersDocument = Document & Answers

export type AnswersModel = Model<AnswersDocument>

export type AnswersStateType = {
    reports: Array<Answers>
}
