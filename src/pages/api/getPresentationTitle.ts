
import { NextApiRequest, NextApiResponse } from 'next'

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { presentationId } = req.body

    const response = await fetch(
        `${process.env.SERVER_URL}/api/get-course-title?courseId=${presentationId}`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )

    const data = await response.json()
    console.log(data)

    if (response.status === 200) {
        res.status(200).json({
            success: true,
            title: data.title
        })
    }

    res.status(response.status).json({ success: false, message: "This shouldnt have happened." })
}

