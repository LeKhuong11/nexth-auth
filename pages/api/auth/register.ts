import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== "POST") {
            return res.status(405).json({ message: "Method Not Allowed" });
        }

        const { email, name, password } = req.body;
        const checkUser = await prisma.user.findUnique({
            where: { email },
        });

        if (checkUser) {
            return res.status(409).json({ message: "User already exists in the system!" });
        }

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: await bcrypt.hash(password, 10),
            },
        });

        return res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An unknown error occurred', error });
    }
}