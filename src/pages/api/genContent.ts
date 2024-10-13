
import { NextApiRequest, NextApiResponse } from 'next'

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { user, prompt } = req.body

    const response = await fetch(
        `${process.env.SERVER_URL}/api/start-presentation-generation`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                input: prompt,
                username: user.email
            })
        }
    )

    const data = await response.json()
    console.log(data)

    if (response.status === 202) {
        res.status(200).json({
            success: true,
            presentationId: data.courseId
        })
    }

    res.status(response.status).json({ success: false, message: "This shouldnt have happened. Ashwath f'ed up." })
}

