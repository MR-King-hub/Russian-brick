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

    useEffect(()=>{
        const {row,column} = gameconfig;
        const gameArr = new Array(row);
        for(let i = 0 ; i < row ; i++){
            gameArr[i] = new Array(column).fill(0)
        }
        setState(gameArr)
    },[])

    const deepClone = (arr:number[][]):number[][]=>{
        const newArr:number[][] = []
        arr.forEach(value=>{
            newArr.push([...value])
        })
        // console.log(JSON.stringify(newArr),JSON.stringify(arr))
        return JSON.parse(JSON.stringify(arr))
    }

    const brickFall = async function(){
        //todo:起始位置计算函数;
        const dropbrick = deepClone(brick.current);
        // todo:不知道为什么，这边使用deepClone会出现问题
        // console.log(JSON.stringify(state))
        const dropgameArr = deepClone(state);
        dropbrick.forEach((arr,index)=>{
            dropgameArr[arr[0]][arr[1]] = 1;
        })
        setState(dropgameArr)
        await sleep();

        const nextdropgameArr = deepClone(dropgameArr);
        dropbrick.forEach((arr,index)=>{
            // nextdropgameArr[arr[0]][arr[1]] = 0;
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
            //todo:添加新砖块
            brick.current.forEach((arr,index)=>{
                nextdropgameArr[arr[0]][arr[1]] = 2;
            })
            setState(nextdropgameArr)
            nextBrick()
        }

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
        const gameBrickarr = [...state];
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
        }
    }
    //todo:
    return <>{state.map((arr,index)=><div key={index} className='flex flex-row h-auto'> {arr.map((value:number,inde:number)=><Brick key = {inde} flag={value}></Brick>)}</div>)}
        <div className='w-80 flex justify-around'>
            <button className="text-white" onClick={()=>nextBrick()}>start</button>
            <button className="text-white" onClick={()=>leftBrick()}>left</button>
            <button className="text-white" onClick={()=>nextBrick()}>right</button>
            <button className="text-white" onClick={()=>nextBrick()}>restart</button>
        </div>
    </>
}