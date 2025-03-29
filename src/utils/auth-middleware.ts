import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "./verify-token";

export function withAuth(handler: (req: NextApiRequest, res: NextApiResponse) => void) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const token = req.cookies.token ?? '';
        const isVerify = verifyToken(token);

        if (!isVerify || !token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Nếu token hợp lệ, tiếp tục API handler
        return handler(req, res);
    };
}
