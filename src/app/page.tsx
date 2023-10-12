
"use client"
import Image from 'next/image'
import Game from './components/game'
import 'react'

export default function Home() {
  return <div className='flex h-full w-full items-center justify-center bg-black'>
    <Game/>
  </div>
}
