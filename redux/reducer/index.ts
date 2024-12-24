import { createReducer } from '@reduxjs/toolkit'
import { login } from 'redux/action'
import {
    currentAdminInitialState,
    postResponseInitialState,
} from 'redux/initialState'

// ایجاد reducer پشتیبانی شده از redux-persist برای adminInformationReducer
export const adminInformationReducer = createReducer(
    currentAdminInitialState,
    (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.adminInformation = action.payload
        })
    }
)

export const postResponseReducer = createReducer(
    postResponseInitialState,
    (builder) => {
        builder.addMatcher(
            (action) =>
                action.type.endsWith('/pending') ||
                action.type.endsWith('/fulfilled') ||
                action.type.endsWith('/rejected'),
            (state, action) => {
                state.isLoading = action.meta.requestStatus === 'pending'
                state.message = (action.payload && action.payload.message) || ''
                state.error =
                    action.meta.requestStatus === 'rejected'
                        ? action.error?.message?.split(',') ?? []
                        : []
            }
        )
    }
)
