import { serialize } from 'cookie'
import { NextApiResponse } from 'next'
import { MAX_AGE } from './index'

const TOKEN_NAME = 'token'

const setTokenCookie = (res: NextApiResponse, token: any) => {
    const cookie = serialize(TOKEN_NAME, token, {
        maxAge: MAX_AGE,
        expires: new Date(Date.now() + MAX_AGE * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
    })
    res.setHeader('Set-Cookie', cookie)
}
export default setTokenCookie
