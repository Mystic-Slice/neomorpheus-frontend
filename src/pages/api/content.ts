
import { NextApiRequest, NextApiResponse } from 'next'

export default async function (req: NextApiRequest, res: NextApiResponse) {
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay
    const { prompt } = req.body
    if(process.env.MOCK === "true") {
        const isCarousel = true // Randomly choose content type for demonstration
        if (isCarousel) {
            res.status(200).json({
                success: true,
                content: {
                    type: 'carousel',
                    items: [
                        { id: 1, imageUrl: '/placeholder.svg?height=400&width=600', caption: 'Image 1' },
                        { id: 2, imageUrl: '/placeholder.svg?height=400&width=600', caption: 'Image 2' },
                        { id: 3, imageUrl: '/placeholder.svg?height=400&width=600', caption: 'Image 3' },
                    ]
                }
            })
        } else {
            // return {
            // type: 'article',
            // title: `Article about ${prompt}`,
            content: `
                <p>This is a sample article about ${prompt}.</p>
                <img src="/placeholder.svg?height=300&width=500" alt="Sample image" />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nunc, vitae tincidunt nisl nunc euismod nunc.</p>
                <img src="/placeholder.svg?height=300&width=500" alt="Another sample image" />
                <p>Donec euismod, nisi vel consectetur interdum, nisl nunc egestas nunc, vitae tincidunt nisl nunc euismod nunc.</p>
            `
            // }
            res.status(200).json({
                success: true,
                content: {
                    type: 'article',
                    title: `Article about ${prompt}`,
                    content: `
                        <p>This is a sample article about ${prompt}.</p>
                        <img src="/placeholder.svg?height=300&width=500" alt="Sample image" />
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nunc, vitae tincidunt nisl nunc euismod nunc.</p>
                        <img src="/placeholder.svg?height=300&width=500" alt="Another sample image" />
                        <p>Donec euismod, nisi vel consectetur interdum, nisl nunc egestas nunc, vitae tincidunt nisl nunc euismod nunc.</p>
                    `
                }
            })
        }
    }

    // !TODO: Implement actual API call
}

