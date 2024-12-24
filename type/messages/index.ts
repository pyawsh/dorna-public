import { Model, Schema, Document } from 'mongoose'

export type Messages = {
    //(in type string is small)

    id: Schema.Types.ObjectId
    userId: Schema.Types.ObjectId
    subject: String
    description: String
    read: Boolean
    sentToCartable: Boolean
    createdAt: Date
}
export type MessagesDocument = Document & Messages

export type MessagesModel = Model<MessagesDocument>

export type MessagesStateType = {
    messages: Array<Messages>
}
