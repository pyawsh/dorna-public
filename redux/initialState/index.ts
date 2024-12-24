export const currentAdminInitialState = {
    adminInformation: {
        id: '',
        username: '',
        adminType: '',
    },
}
export const postResponseInitialState = {
    isLoading: false,
    message: '',
    error: [] as string[] | undefined,
}
