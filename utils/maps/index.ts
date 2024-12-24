import {
    ExpertInfo,
    UserInfo,
    Image,
    SupportInfo,
    Audio,
    Video,
    Exam,
    PreExamOrLastExam,
} from 'model'

export const adminInfoModelMap = {
    expert: ExpertInfo,
    user: UserInfo,
    support: SupportInfo,
} as any

export const mediaModelMap = {
    video: Video,
    audio: Audio,
    image: Image,
} as any

export const levelModelMap = {
    exam: Exam,
    lastExam: PreExamOrLastExam,
    preExam: PreExamOrLastExam,
} as any
