import React, { useState, useCallback, useContext, useEffect } from 'react'
import { Send, Book, SearchCheckIcon, Rabbit } from 'lucide-react'
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import Sidebar from '~/components/custom/sidebar'
import { useRouter } from 'next/router'
import { UserContext } from '~/contexts/UserProvider'
import Recommendations from './recommendations'
import { apiReq } from '~/utils'
import { HomeButton } from '~/components/custom/homeButton'

export default function Home() {
  const router = useRouter();
  
  const [prompt, setPrompt] = useState('')

  const handleSubmit = () => {
    router.push(`/learn/${prompt}`);
  }

  const handleKeyPress = useCallback((e: { key: string }) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }, [handleSubmit])

  return (
    <div className="flex h-screen bg-gray-100 flex-col p-4">
        {/* Chat Box */}
        <div className="flex-1 p-4 mb-4 overflow-hidden flex flex-col justify-center">
            {/* Insert a logo here from lucide react */}
            <HomeButton/>
            <h1 className="text-2xl font-semibold mb-4">Welcome to the Morpheus' Grinning Cat: Your guide to cybersecurity</h1>
            <div className="flex gap-2 mt-4 shadow-md bg-white p-4 rounded-lg">
              <Input
                type="text"
                placeholder="Ask a question..."
                value={prompt}
                onKeyDown={handleKeyPress}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSubmit}>
                <Send className="w-4 h-4 mr-2" />
                Send
              </Button>
            </div>
        </div>

        <Recommendations/>
    </div>
  )
}