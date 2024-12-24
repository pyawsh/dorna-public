import { Model, Schema, Document } from 'mongoose'

export type FAQ = {
    id: Schema.Types.ObjectId
    question: string
    answer: string
}
export type FAQDocument = Document & FAQ

export type FAQModel = Model<FAQDocument>

export type FAQStateType = {
    reports: Array<FAQ>
}
