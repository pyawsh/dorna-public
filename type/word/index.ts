import { Model } from 'mongoose'
type word = { word: string }
type id = { id: string }

export type WordDocument = Document &
    word & {
        createdAt: Date
    }

export type WordModel = Model<WordDocument>

export type WordStateType = {
    words: Array<
        word &
            id & {
                image: boolean
                audio: boolean
                videoWithSound: boolean
                videoWithoutSound: boolean
            }
    >
}
export type addWordForm = word
