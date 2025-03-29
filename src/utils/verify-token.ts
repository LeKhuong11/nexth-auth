import jwt from "jsonwebtoken";


const SECRET_KEY = process.env.JWT_SECRET as string;

export function verifyToken(token: string) {
    if(!token) return null;
    try {
        return jwt.verify(token, SECRET_KEY) as { userId: string };
    } catch (error) {
        console.error("Invalid Token:", error);
        return null;
    }
}