
import { NextApiRequest, NextApiResponse } from 'next'

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { presentationId, slideNumber } = req.body
    console.log(presentationId, slideNumber)

    const response = await fetch(
        `${process.env.SERVER_URL}/api/slide/${presentationId}/${slideNumber}`
    )

    const data = await response.json()
    console.log(data)

    if (response.status === 200) {
        res.status(200).json({success: true, slide: data})
    }

    res.status(response.status).json({ success: false, message: "This shouldnt have happened." })
}

