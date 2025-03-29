import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

interface DecodedToken {
    userId: string;
    iat?: number;
    exp?: number;
}

const JWT_SECRET = process.env.JWT_SECRET as string;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded: DecodedToken = jwt.verify(token, JWT_SECRET) as DecodedToken;
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    if (!user) return res.status(401).json({ message: "User not found" });

    res.json({ 
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email,
      } 
    });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", error });
  }
}
