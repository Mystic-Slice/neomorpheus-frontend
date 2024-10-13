import { NextApiRequest, NextApiResponse } from "next";
import { User } from "~/types";
// import { User } from "~/types";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if(!req.body) {
        res.statusCode = 404
        res.end("Error")
        return
    }

    const { user } = req.body
    console.log("User History", user)

    if(process.env.MOCK === "true") {
        // Mock response
        res.status(200).json({
            success: true,
            contentList: ["Topic 1", "Topic 2"]
        })
        return
    }

    const response = await fetch(
        `${process.env.SERVER_URL}/api/courseids/${user.email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }
    )

    const data = await response.json()
    console.log("User History", data)

    if (response.status === 200) {
        res.status(200).json({success: true, contentList: data})
    }
}