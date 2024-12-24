import { parse } from "cookie";
import { NextApiRequest } from "next";

const parseCookies = (req: NextApiRequest) => {
	if (req.cookies) return req.cookies;
	const cookie = req.headers?.cookie;
	return parse(cookie || "");
};

export default parseCookies;
