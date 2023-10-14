import Brick from './brick';
import {useState,useRef, useEffect,useCallback} from 'react'
import gameconfig from '../config'

const sleep = (time=2000)=>{
    return new Promise<void>((resolve,reject)=>{
        setTimeout(()=>resolve(),time)
    })
}

export default function Game(){
    // console.log(gameconfig)

    const [state,setState] = useState<number[][]>([[]]);
    const flag = useRef(true);
    const brick = useRef<number[][]>([[]]);
    const gameArr = useRef<number[][]>([[]])

    useEffect(()=>{
        console.log('test')
        const {row,column} = gameconfig;
        const initgameArr = new Array(row);
        for(let i = 0 ; i < row ; i++){
            initgameArr[i] = new Array(column).fill(0)
        }
        setState(initgameArr)
        gameArr.current = initgameArr
    },[])

    const deepClone = (arr:number[][]):number[][]=>{
        return JSON.parse(JSON.stringify(arr))
    }

    const brickFallControl = (dropgameArr:number[][])=>{
        const nextdropgameArr = deepClone(dropgameArr);
        const dropbrick = deepClone(brick.current)

        dropbrick.forEach((arr,index)=>{
            dropgameArr[arr[0]][arr[1]] = 0;
            if(arr[0]<gameconfig.column-1&&nextdropgameArr[arr[0]+1][arr[1]]!==2){
                arr[0]++;
            }
            else{
                flag.current = false;
            }
        })

        if(flag.current){
            brick.current = dropbrick;
            brickFall()
        }
        else{
            brick.current.forEach((arr,index)=>{
                nextdropgameArr[arr[0]][arr[1]] = 2;
            })
            setState(nextdropgameArr)
            gameArr.current = nextdropgameArr
            nextBrick()
        }
    }

    const brickFall = async function(){
        const dropbrick = deepClone(brick.current);
        const dropgameArr = deepClone(gameArr.current);
        dropbrick.forEach((arr,index)=>{
            dropgameArr[arr[0]][arr[1]] = 1;
        })
        setState(dropgameArr)
        gameArr.current = dropgameArr
        await sleep()
        brickFallControl(dropgameArr)
    }

    const nextBrick = function(){
        function getRandomInt(max:number) {
            return Math.floor(Math.random() * max);
          }
        const brickarr = deepClone(gameconfig.brick[getRandomInt(gameconfig.brick.length)])
        brick.current = brickarr;
        flag.current = true;
        brickFall()
    }

    const leftBrick = function(){
        const leftbrick:number[][] = JSON.parse(JSON.stringify(brick.current));
        const gameBrickarr = deepClone(gameArr.current);
        let left = true;
        leftbrick.forEach((arr,index)=>{
            if(arr[1]>0){
                arr[1]--;
            }
            else left = false;
        })

        if(left){
            brick.current.forEach(arr=>gameBrickarr[arr[0]][arr[1]] = 0);

            leftbrick.forEach(arr=>gameBrickarr[arr[0]][arr[1]] = 1);
            // console.log(brick.current,leftbrick)
            brick.current = leftbrick;
            setState(gameBrickarr)
            gameArr.current = gameBrickarr
        }
    }
    //todo:
    return <>{state.map((arr,index)=><div key={index} className='flex flex-row h-auto'> {arr.map((value:number,inde:number)=><Brick key = {inde} flag={value}></Brick>)}</div>)}
        <div className='w-80 flex justify-around'>
            <button className="text-white" onClick={()=>nextBrick()}>start</button>
            <button className="text-white" onClick={()=>leftBrick()}>left</button>
            <button className="text-white" onClick={()=>nextBrick()}>right</button>
            <button className="text-white" onClick={()=>brickFall()}>restart</button>
        </div>
    </>
}