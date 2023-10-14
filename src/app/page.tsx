
"use client"
import Image from 'next/image'
import Game from './components/game'
import Test from './components/game/test'
import 'react'

export default function Home() {
  return <div className='flex flex-col h-full w-full items-center justify-center bg-black'>
    <Game/>
    <Test/>
  </div>
}
