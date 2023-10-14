import {useState} from 'react'

export default function Test(){
    const [state,setState] = useState([[0],[1]]);
    function test(){
        console.log(state);
        const arr = JSON.parse(JSON.stringify(state));
        arr[0][0]++;
        arr[1][0]++;
        setState(arr)
        setTimeout(()=>{test()},1000)
    }
    return <div onClick={()=>test()} className='text-white'>test</div>
}