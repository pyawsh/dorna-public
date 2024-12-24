import { Model, Schema, Document } from 'mongoose'

export type Report = {
    id: Schema.Types.ObjectId
    userId: Schema.Types.ObjectId
    duration: number
    createdAt: Date
}
export type ReportDocument = Document & Report

export type ReportModel = Model<ReportDocument>
