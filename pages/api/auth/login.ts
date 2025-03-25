import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';


const JWT_SECRET = process.env.JWT_SECRET as string;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: {    
                email: email,
            }
        });

        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) { 
            return res.status(401).json({ message: 'Password is incorrect' });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

        res.setHeader("Set-Cookie", `token=${token}; HttpOnly; Secure=false; SameSite=Strict; Path=/; Max-Age=3600`);

        res.status(200).json({ 
            token,
            user 
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An unknown error occurred' });
    }


    res.status(200).json({ message: 'Login page' })
  }