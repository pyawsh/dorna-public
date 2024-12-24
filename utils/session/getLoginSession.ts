import Iron from '@hapi/iron'
import type { NextApiRequest } from 'next'
import { getTokenCookie } from '../cookie'

const getLoginSession = async (req: NextApiRequest) => {
    const token = getTokenCookie(req)

    if (!token) return

    const { TOKEN_SECRET } = process.env

    if (!TOKEN_SECRET) {
        return 'not find TOKEN_SECRET'
    }

    const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults)
    const expiresAt = session.createdAt + session.maxAge * 1000

    if (Date.now() > expiresAt) {
        throw new Error('Session expired')
    }

    return session
}
export default getLoginSession
