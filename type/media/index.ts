import { Document, Model, Schema } from 'mongoose'

type path = { path: string }
type createdAt = { createdAt: Date }
type wordIdType = { wordId: Schema.Types.ObjectId }
type IdType = { _id: string }

type pathAndCreatedAt = path &
    createdAt

export type MediaStateType = {
    wordMedia: Array<ImageType | AudioType | VideoType>
}

export type AcceptDocument = Document & pathAndCreatedAt

export type AcceptModel = Model<AcceptDocument> & {}

export type AudioType = IdType &
    pathAndCreatedAt &
    wordIdType & {
        snr: string
    }
export type AudioDocument = Document & AudioType
export type AudioModel = Model<AudioDocument>

export type ImageType = IdType & pathAndCreatedAt & wordIdType
export type ImageDocument = Document & ImageType
export type ImageModel = Model<ImageDocument>

export type VideoType = IdType &
    wordIdType &
    pathAndCreatedAt & {
        snr: string
        sound: boolean
    }
export type VideoDocument = Document & VideoType
export type VideoModel = Model<VideoDocument>

export type FileStateType = { acceptId: string }

export type AddMediaForm = {
    acceptId: string
    snr?: string
    wordId: string
}
