import { createThunk } from 'api'

export const login = createThunk('auth/login', 'post', 'api/doapi')

export const logout = createThunk('auth/logout', 'get', 'admin/logout')

export const checkLogin = createThunk(
    'auth/checkLogin',
    'get',
    'admin/check-login'
)

export const getUserInfo = createThunk('user/getAll', 'get', 'admin/user')

export const getDashboardInfo = createThunk('dashboard', 'get', 'dashboard')

export const getAllWords = createThunk('words/getAll', 'get', 'word/getAll')

export const addWord = createThunk('word/add', 'post', 'word')

export const deleteWord = createThunk('word/delete', 'delete', 'word')

export const uploadFile = createThunk('file/upload', 'post', 'media/upload')

export const acceptMedia = createThunk('video', 'post', 'media/accept')

export const getWordMedia = createThunk('word/media', 'get', `word`)

export const deleteMedia = createThunk('delete/media', 'delete', `media/delete`)

export const updateMedia = createThunk('update/media', 'patch', `media/update`)

export const addQuiz = createThunk('add/quiz', 'post', `quiz`)

export const getAllQuiz = createThunk('getAll/quiz', 'get', `quiz`)

export const deleteQuiz = createThunk('delete/quiz', 'delete', `quiz`)

export const patchQuiz = createThunk('patch/quiz', 'patch', `quiz`)

export const addLevel = createThunk('add/level', 'post', `level`)

export const getAllLevel = createThunk('getAll/level', 'get', `level`)

export const getLevel = createThunk('get/level', 'get', `level/get`)

export const removeLevel = createThunk('remove/level', 'delete', `level`)

export const patchLevel = createThunk('patch/level', 'patch', `level`)

export const addQuestion = createThunk('add/question', 'post', `question`)

export const getMediaPath = createThunk('get/path', 'get', 'word')

export const getAllQuestions = createThunk('getAll/question', 'get', `question`)

export const deleteQuestions = createThunk(
    'delete/question',
    'delete',
    `question`
)

export const getAllAdminInfo = createThunk('admin/information', 'get', 'admin')

export const signupAdmin = createThunk('admin/signup', 'post', 'admin/signup')

export const setActiveAdmin = createThunk(
    'admin/setActive',
    'patch',
    'admin/setActive'
)

export const deleteAdmin = createThunk('admin/setActive', 'delete', 'admin')

export const getAdminInfo = createThunk('admin/get', 'get', 'admin')

export const patchAdminInfo = createThunk('adminInfo/patch', 'patch', 'admin')

export const getAllMessage = createThunk('message/getAll', 'get', 'messages')

export const getMessage = createThunk('message/get', 'get', 'messages')

export const patchMessage = createThunk('message/patch', 'patch', 'messages')

export const getCartable = createThunk('cartable/get', 'get', 'cartable')

export const getAnswersMessage = createThunk(
    'answerMessage/get',
    'get',
    'answerMessages'
)

export const sendAnswerMessage = createThunk(
    'send/message',
    'post',
    'answerMessages'
)

export const getUserInfoReport = createThunk(
    'userInfoReport/get',
    'get',
    'report/userInfo'
)
export const getQuizIdReport = createThunk(
    'quizIdReport/get',
    'get',
    'report/getQuizId'
)
export const getDurationAndCount = createThunk(
    'durationAndCount/get',
    'get',
    'report/getDurationAndCount'
)

export const getUserReport = createThunk('user/report', 'get', 'report')

export const getAllFAQ = createThunk('getAll/FAQ', 'get', 'faq/all')

export const deleteFAQ = createThunk('delete/FAQ', 'delete', 'faq')

export const addFAQ = createThunk('add/FAQ', 'post', 'faq')
