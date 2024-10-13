import React, { useContext, useEffect, useState } from 'react'
import { ScrollArea } from "src/components/ui/scroll-area"
import { UserContext } from '~/contexts/UserProvider';
import { Button } from '../ui/button';
import { HomeButton } from './homeButton';
import { apiReq } from '~/utils';

export default function Sidebar() {
  const {user, logout} = useContext(UserContext);

  const [userHistory, setUserHistory] = useState<string[]>([]);

  useEffect(() => {
    // Fetch user history
    (async () => {
      const response = await apiReq("userHistory", {"username": user?.username});
      if (!response.success) {
        console.error(response.error);
        return;
      }
      setUserHistory(response.contentList);
    })();
  }, [])

  return (
    <div className="w-64 bg-white border-r">
      <div className="p-4">
        <HomeButton/>
      </div>
      <ScrollArea className="h-[calc(100vh-150px)] p-4">
        {userHistory.map((item, index) => (
          <div key={index} className="mb-2 p-2 rounded bg-gray-100">
            <p className="text-sm">{item}</p>
          </div>
        ))}
      </ScrollArea>

      <div className="p-4 flex justify-center">
        <Button onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  )
}