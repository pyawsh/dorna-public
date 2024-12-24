import { Model, Schema } from 'mongoose'

type createdAt = { createdAt: Date }
export type id = { _id: string }
export type QuestionType = {
    levelId: Schema.Types.ObjectId
    questionType: 'audio' | 'video'
    questionPath?: string
    answerPath: string
    otherAnswersPath: [string]
}

export type QuestionDocument = Document & QuestionType & createdAt

export type QuestionModel = Model<QuestionDocument>

export type questionStateType = {
    questions: Array<id & QuestionType>
}

export type addQuestionForm = {
    levelId: string
    questionType: 'video' | 'audio'
    questionPath: string
    answerPath: string
    otherAnswersPath: Array<string>
}
