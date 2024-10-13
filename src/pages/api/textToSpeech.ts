import { NextApiRequest, NextApiResponse } from 'next'

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { text } = req.body

    const response = await fetch(`${process.env.SERVER_URL}/generate-tts`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    text:text
                }
            )
        }
        
    )

    const data = await response.json()
    console.log(data)

    if (response.status === 200) {
        res.status(200).json({success: true, data: data})
    }

    res.status(response.status).json({ success: false, message: "This shouldnt have happened." })
}

