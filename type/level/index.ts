import { Model, Schema } from 'mongoose'
type id = { _id: string }

export type level = {
    quizId: Schema.Types.ObjectId
    levelType: 'preExam' | 'exam' | 'lastExam'
    order: number
}

export type LevelDocument = Document &
    level & {
        createdAt: Date
    }

export type LevelModel = Model<LevelDocument>

export type LevelStateType = {
    levels: Array<id & level>
}
export type addLevelForm = level

export type Exam = {
    levelId: Schema.Types.ObjectId
    title: string
    scoreLimit?: string
    logoPath: string
    winVideoPath: string
}

export type ExamDocument = Document &
    Exam & {
        createdAt: Date
    }

export type ExamModel = Model<ExamDocument>

export type PreExamOrLastExam = {
    levelId: Schema.Types.ObjectId
    scoreLimit: number
    logoPath: string
    winVideoPath: string
}

export type PreExamOrLastExamDocument = Document &
    PreExamOrLastExam & {
        createdAt: Date
    }

export type PreExamOrLastExamModel = Model<PreExamOrLastExamDocument>
