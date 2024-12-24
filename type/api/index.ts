type error = { error: string[] | undefined }
type isLoading = { isLoading: boolean }
type message = { message: string }

export type postResponseType = error & isLoading & message
