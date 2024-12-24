import { serialize, parse } from "cookie";
import type { NextApiResponse } from "next";

const TOKEN_NAME = "token";

const removeTokenCookie = (res: NextApiResponse) => {
	const cookie = serialize(TOKEN_NAME, "", {
		maxAge: -1,
		path: "/",
	});

	res.setHeader("Set-Cookie", cookie);
};

export default removeTokenCookie;
