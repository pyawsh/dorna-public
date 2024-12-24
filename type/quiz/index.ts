import { Model } from 'mongoose'
type id = { _id: string }
export type quiz = { name: string; order: number }

export type QuizDocument = Document &
    quiz & {
        createdAt: Date
    }

export type QuizModel = Model<QuizDocument>

export type QuizStateType = {
    quizzes: Array<id & quiz>
}
export type addQuizForm = quiz
