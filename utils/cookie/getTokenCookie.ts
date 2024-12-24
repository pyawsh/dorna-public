import type { NextApiRequest } from "next";
import parseCookies from "./parseCookies";

const TOKEN_NAME = "token";

const getTokenCookie = (req: NextApiRequest) => {
  const cookies = parseCookies(req);
  return cookies[TOKEN_NAME];
};

export default getTokenCookie;
