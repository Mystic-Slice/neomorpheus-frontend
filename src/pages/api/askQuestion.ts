
import { NextApiRequest, NextApiResponse } from 'next'

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { presentationId, prompt } = req.body
    console.log(presentationId, prompt)

    const response = await fetch(
        `${process.env.SERVER_URL}/api/ask-question`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                courseId: presentationId,
                question: prompt
            })
        }
    )

    const data = await response.json()
    console.log(data)

    if (response.status === 200) {
        res.status(200).json({
            success: true,
            answer: data.answer
        })
    }

    res.status(response.status).json({ success: false, message: "This shouldnt have happened." })
}

