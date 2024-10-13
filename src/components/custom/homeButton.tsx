{/* <div className='flex flex-row'>
              <Rabbit className="w-10 h-10 text-blue-500" />
              <Rabbit className="w-10 h-10 text-red-500 scale-x-[-1]" />
            </div> */}

import { Rabbit } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const HomeButton = () => {
    return (
        <Link className='flex flex-row' href='/'>
            <Rabbit className="w-10 h-10 text-blue-500" />
            <Rabbit className="w-10 h-10 text-red-500 scale-x-[-1]" />
        </Link>
    )
}