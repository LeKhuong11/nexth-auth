
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // Xóa token bằng cách set lại với maxAge = 0
    res.setHeader("Set-Cookie", `token=; HttpOnly; Secure=false; SameSite=Strict; Path=/; Max-Age=0`);

    res.status(200).json({ 
        message: 'Logout successfully'
    });
}
