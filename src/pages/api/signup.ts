import { NextApiRequest, NextApiResponse } from "next";
import { User } from "~/types";
// import { User } from "~/types";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if(!req.body) {
        res.statusCode = 404
        res.end("Error")
        return
    }

    const { email, password, username, age } = req.body

    if(process.env.MOCK) {
        // Mock response
        res.status(200).json({ username, email, age } as User)
        return
    }

    // Request to server
    const response = await fetch(`${process.env.SERVER_URL}/api/signup`, req.body)
    const data = await response.json()

    res.status(response.status).json(data)
}