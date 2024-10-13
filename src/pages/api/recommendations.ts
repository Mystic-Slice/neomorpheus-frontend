import { get } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
const recommendations_young = [
    { 
        title: "Social Media Privacy Settings", 
        description: "Learn how to adjust privacy settings on platforms to protect personal information and limit exposure to threats.", 
        prompt: "What are the important things to know about Social Media Settings?" 
    },
    { 
        title: "Recognizing Phishing Attempts", 
        description: "Get trained on identifying phishing emails and scams, focusing on common tactics used by scammers.", 
        prompt: "How can you recognize phishing attempts in your emails?" 
    },
    { 
        title: "Safe Online Gaming Practices", 
        description: "Understand how to protect personal information while gaming and recognize in-game scams.", 
        prompt: "What precautions should you take while gaming online?" 
    }
];

const recommendations_old = [
    { 
        title: "Understanding Scam Calls and Robocalls", 
        description: "Learn how to recognize and respond to suspicious phone calls, including common scams targeting older adults.", 
        prompt: "What should you do if you receive a suspicious phone call?" 
    },
    { 
        title: "Email Security and Phishing Awareness", 
        description: "Attend seminars on recognizing phishing emails and understanding what information should never be shared.", 
        prompt: "How can you protect yourself from email phishing attacks?" 
    },
    { 
        title: "Password Management and Security", 
        description: "Discover the importance of strong passwords and how to use password managers effectively.", 
        prompt: "What are the best practices for creating and managing strong passwords?" 
    }
];

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { user } = req.body;

    if(process.env.MOCK === "true") {
        if(user.age < 30) {
            res.status(200).json({ success: true, data: recommendations_young })
        } else {
            res.status(200).json({ success: true, data: recommendations_old })
        }
        return
    }

    // Actual implementation
    const response = await fetch(
        `${process.env.SERVER_URL}/api/recommended-prompts?username=${user.email}`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    const data = await response.json()

    const recos: any = []
    Object.entries(data.recommendations).forEach(([title, description]) => {recos.push({title, description})})

    res.status(response.status).json({success: true, data: recos})
}