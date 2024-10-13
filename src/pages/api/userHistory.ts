import { NextApiRequest, NextApiResponse } from "next";
import { User } from "~/types";
// import { User } from "~/types";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if(!req.body) {
        res.statusCode = 404
        res.end("Error")
        return
    }

    const { username } = req.body

    if(process.env.MOCK === "true") {
        // Mock response
        res.status(200).json({
            success: true,
            contentList: ["Topic 1", "Topic 2"]
        })
        return
    }

    // !TODO: Implement actual API call
}