import React, { useContext, useEffect, useState } from 'react'
import { History } from 'lucide-react'
import { ScrollArea } from "src/components/ui/scroll-area"
import { UserContext } from '~/contexts/UserProvider';

export default function Sidebar() {
  const {logout} = useContext(UserContext);

  const [userHistory, setUserHistory] = useState<string[]>([]);

  useEffect(() => {
    // Fetch user history
    // !TODO: Fetch user history from the server
    const data: string[] = ["Topic 1", "Topic 2"];
    setUserHistory(data);
  }, [])

  return (
    <div className="w-64 bg-white border-r">
      <div className="p-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <History className="w-5 h-5" />
          History
        </h2>
      </div>
      <ScrollArea className="h-[calc(100vh-150px)] p-4">
        {userHistory.map((item, index) => (
          <div key={index} className="mb-2 p-2 rounded bg-gray-100">
            <p className="text-sm">{item}</p>
          </div>
        ))}
      </ScrollArea>

      {/* Logout button at the bottom */}
      <div className="p-4 border-t">
        <button className="bg-red-500 text-white px-4 py-2 rounded w-full" onClick={logout}>Logout</button>
      </div>
    </div>
  )
}