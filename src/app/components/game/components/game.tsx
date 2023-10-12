import Brick from './brick';
import {useState,useRef, useEffect} from 'react'
import gameconfig from '../config'

export default function Game(){
    // console.log(gameconfig)
    const [state,setState] = useState([[]]);
    useEffect(()=>{
        const {row,column} = gameconfig;
        const gameArr = new Array(row);
        for(let i = 0 ; i < row ; i++){
            gameArr[i] = new Array(column).fill(0)
        }
        setState(gameArr)
        console.log(gameArr)
    },[])
    return state.map((arr,index)=><div key={index} className='flex flex-col h-auto'> {arr.map((value,inde)=><Brick key = {inde} flag={value}></Brick>)}</div>)
}