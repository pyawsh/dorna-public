import Iron from '@hapi/iron'
import { NextApiResponse } from 'next'
import { MAX_AGE, setTokenCookie } from 'utils'

const { TOKEN_SECRET } = process.env

const setLoginSession = async (res: NextApiResponse, session: any) => {
    const createdAt = Date.now()
    const obj = { ...session, createdAt, maxAge: MAX_AGE }

    const token: undefined | string =
        TOKEN_SECRET && (await Iron.seal(obj, TOKEN_SECRET, Iron.defaults))
    await setTokenCookie(res, token)
}

export default setLoginSession
